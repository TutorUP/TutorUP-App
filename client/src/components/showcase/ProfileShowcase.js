import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// import components
import ProgressSpinner from '../common/ProgressSpinner';
import ProfileItem from './ProfileItem';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';

// redux imports
import { connect } from 'react-redux';
import { getProfiles } from '../../redux/actions/profileActions';
import { getSubjects } from '../../redux/actions/subjectActions';

// MUI imports
import { withStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';

const styles = {
    card: {
        minWidth: 300,
    },
    padding20: {
        padding: 20,
    },
    marginLeft20: {
        marginLeft: 20,
    }
};

class ProfilesShowcase extends Component {
    constructor(){
        super();
        this.state = {
        data: getProfiles(),
        searching: false,
        filtering: false,
        searchText: '',
        text: '',
        orderDropDown: null,
        filterDropDown: null,
        majorsDropDown: null,
        subjects: getSubjects(),
        major: [],
        shuffled: false,
      };
    }

    //Functions then render
    componentDidMount() {
        this.props.getProfiles();
        this.props.getSubjects();
    }

    //for randomizing profiles displayed
    shuffle = event => {
        if(this.state.searching === true){
            var array = this.state.data;
        }
        else{
            var array = this.props.profile.profiles;
        }
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // Randomly swap elements.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
        console.log(array);
        this.setState({
            data: array,
            shuffled: true,
        })
    }
    
    closeOrderMenu = event => {
          this.setState({
              orderDropDown: null,
          })
      } 

    closeFilterMenu = event => {
        this.setState({
            filterDropDown: null,
        })
    } 
    
    closeMajorsMenu = event => {
        this.setState({
            majorsDropDown: null,
        })
    }

    handleFilterBy = event => {
        this.setState({ 
            filterDropDown: event.currentTarget,
        });
    };

    handleOrderBy = event => {
        this.setState({ 
            orderDropDown: event.currentTarget,
        });
    }

    handleMajorsMenu = event => {
        this.setState({
            majorsDropDown: event.currentTarget,
        })
    }

    handleCheck = name => event => {
        this.setState({
          [name]: event.target.checked,
        });
      };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };


    orderByMajor = (order) => event => {
        let profileList = this.state.data;
        var majorSorted = _.groupBy(profileList, 'major'); 
    

        console.log('Sorting by major...');
        this.setState({
            data: majorSorted,
        }); 
    }

    // sort currently displayed profiles by name alphabetically 
    orderByName = (order) => event => {
        if(this.state.searching === false){
            var profileList = this.props.profile.profiles;
            let nameSorted = profileList.sort(function(a,b) {
                var nameA=a.user.firstname.toLowerCase();
                var nameB=b.user.firstname.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0
            })
            this.setState(state => ({
                data: nameSorted,
            })); 
        }
        else{ 
            var data = this.state.data;
            let nameSorted = data.sort(function(a,b) {
                var nameA=a.user.firstname.toLowerCase();
                var nameB=b.user.firstname.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0
            })
            this.setState(state => ({
                data: nameSorted,
            })); 
        }
    }

     //uses current value of search bar to find tutors based on name, major, or the courses they tutor   
     handleSearch = text => event => {   
        this.setState({
            [text]: event.target.searchText
        });
        let search_text = event.target.value;
        let profileList = this.props.profile.profiles;
        console.log("Search Start!");
        if (search_text.length > 0){
            let searchList = [];  //searchList will contain all the matching profiles from the search_text input
            for(var prof in profileList){
                let profile = profileList[prof];
                let firstName = profile.user.firstname;
                //find matching course attributes
                let courses = profile.courses;
                if(courses.length > 0){
                    for(var c in courses){
                        let course = courses[c];
                        //Course Number ex: 301, 303, ...
                        if(course.courseNumber === search_text){
                            if(searchList.includes(profile)){
                                console.log("profile already in list: " + firstName);
                            }
                            else{
                                console.log(profile.user.firstname + " added by course #" + course.courseNumber);
                                searchList.push(profile);
                            }
                        }
                       //Course ID ex: CS, HST, MTH...
                        if(course.courseId.toLowerCase() === search_text.toLowerCase()){
                            if(searchList.includes(profile)){
                                console.log("profile already in list: " + firstName);
                            }
                            else{
                                console.log(profile.user.firstname  + " added by courseId " + course.courseId);
                                searchList.push(profile);
                            }
                        }
                        //combo of the two above... ex: CS301 or CS 301
                        if(search_text.toLowerCase() === (course.courseId + course.courseNumber).toLowerCase() 
                            || search_text.toLowerCase() === (course.courseId + ' ' + course.courseNumber).toLowerCase()){
                                if(searchList.includes(profile)){
                                    console.log("profile already in list: " + firstName);
                                }
                                else{
                                    console.log(profile.user.firstname  + " added by specific course " + course.courseId + ' ' + course.courseNumber);
                                    searchList.push(profile);
                                }
                        }
                    }
                }

                //compare first name to search text, add to list if similar
                if (firstName.length >= search_text.length){
                    let userName = firstName.substring(0, search_text.length).toLowerCase();
                    if(userName.includes(search_text.toLowerCase())){
                        //check to see if profile is has already been hit
                        if(searchList.includes(profile)){
                            console.log("profile already in list: " + firstName);
                        }
                        else{
                            searchList.push(profile);
                            console.log(firstName + " added by name");
                        }  
                    }
                }
                // by major
                let majors = profile.major;
                for(var m in majors){
                    let major = majors[m];
                    if(major.length >= search_text.length){
                        let majorSub = major.substring(0, search_text.length).toLowerCase();
                        if(search_text.toLowerCase() === majorSub){
                            if(searchList.includes(profile)){
                                console.log("profile already in list: " + firstName);
                            }
                            else{
                                console.log(firstName + " added by major");
                                searchList.push(profile);
                            }
                        }
                    }
                }
            }
            //updates displayed profiles with search list 
            if(searchList.length > 0){
                this.setState(state => ({
                    data: searchList,
                    searching: true
                }));
            }
        }
        else { //if there is no text in search bar, don't use search list
            this.setState(state => ({
                searching: false
            }));
        }
    }

    //Returns results from profiles relating to chosen subject
    filterBySubject = (filterBy) => event => {
        let profileList = this.props.profile.profiles;
        let results = [];
        for(var prof in profileList){
            let profile = profileList[prof];
            let majors = profile.major;
            for(var m in majors){
                let major = majors[m];
                if(filterBy === major && !results.includes(profile)){
                    results.push(profile);
                }
            }
        }
        this.setState({
            data: results,
            filtering: true,
        });
    }

    filterByPaid = (paid) => event => {
        let profileList = this.props.profile.profiles;
        let results = [];
        for(var prof in profileList){
            let profile = profileList[prof];
            let type = profile.type;
            if(type === "Paid" && !results.includes(profile)){
                results.push(profile);
            }
        }
        this.setState({
            data: results,
            filtering: true,
        });
    }

    render() {
        const { classes } = this.props;
        const { profiles, loading } = this.props.profile;
        const { orderDropDown, filterDropDown, majorsDropDown, subjects} = this.state;

        let allSubjects = this.props.subjects.subjects;  
        let courseMenuItems = (<MenuItem value="None">None</MenuItem>);
        if(allSubjects){
            courseMenuItems = allSubjects.map((subject, i) =>
                <MenuItem key={i} value={subject.name} onClick={this.filterBySubject(subject.name)}>{subject.name}</MenuItem>
            );
        }

        let profileItems;

        if (profiles === null || loading) {
            profileItems = (<ProgressSpinner />)
        }
        else {  //if text in search bar, display search results
            if(this.state.searching === true || this.state.filtering === true || this.state.shuffled == true){
                let searchData = this.state.data;
                profileItems = searchData.length > 0 ?
                searchData.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                )) : (
                    <div>
                        <h1>No Profiles To List</h1>
                    </div>
                );
            }
            else { 
                let Profiles = profiles;
                profileItems = profiles.length > 0 ?
                Profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                )) : (
                    <div>
                        <h1>No Profiles To List</h1>
                    </div>
                );
            }
        }
        return (
            <div>
            <header>
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.padding20}>
                                        <React.Fragment>
                                            <SearchIcon />
                                            <Input id='search' placeholder="Name, Major, or Course" value={this.state.searchText} onChange={this.handleSearch('searchText')} className={classes.marginLeft20}/>   
                                            <Button variant="contained" className={classes.marginLeft20} aria-haspopup="true" onClick={this.handleOrderBy} aria-owns={orderDropDown ? 'orderByMenu' : undefined}>Order by</Button>
                                            <Menu id='orderByMenu' anchorEl={orderDropDown} open={Boolean(orderDropDown)} onClose={this.closeOrderMenu}>
                                                <MenuItem onClick={this.orderByName()}> First Name</MenuItem>
                                                <MenuItem onClick={this.orderByMajor()}> By Major </MenuItem>
                                            </Menu>

                                            <Button variant="contained" className={classes.marginLeft20} aria-haspopup="true" onClick={this.handleFilterBy} aria-owns={filterDropDown ? 'filterByMenu' : undefined}>Filter by</Button>
                                            <Menu id='filterByMenu' anchorEl={filterDropDown} open={Boolean(filterDropDown)} onClose={this.closeFilterMenu}>
                                                <MenuItem onClick={this.filterByPaid('paid')}> Paid or Volunteer</MenuItem>
                                                <MenuItem onClick={this.filterByPaid('class')}> Course Name</MenuItem>
                                                <Button className={classes.marginLeft20} aria-haspopup="true" onClick={this.handleMajorsMenu} aria-owns={majorsDropDown ? 'majorsMenu' : undefined}>Majors</Button>
                                                    <Menu id="majorsMenu" anchorEl={majorsDropDown} open={Boolean(majorsDropDown)} onClose={this.closeMajorsMenu}>
                                                        {courseMenuItems}
                                                    </Menu>
                                            </Menu> 
                                            <Button variant="contained" className={classes.marginLeft20} onClick={this.shuffle}>Shuffle</Button>
                                            <br/>
                                        </React.Fragment>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </header>
            <div>
                <Grid container spacing={24}>
                    {profileItems}
                </Grid>
            </div>
        </div>
        );
    }
}

ProfilesShowcase.propTypes = {
    profile: PropTypes.object.isRequired,
    subjects: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    subjects: state.subjects,
});

export default connect(mapStateToProps, { getProfiles, getSubjects })(withStyles(styles)(ProfilesShowcase))