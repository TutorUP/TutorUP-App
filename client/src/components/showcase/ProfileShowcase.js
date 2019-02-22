import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// import components
import ProgressSpinner from '../common/ProgressSpinner';
import ProfileItem from './ProfileItem';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import SortIcon from '@material-ui/icons/SortByAlpha';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SubjectIcon from '@material-ui/icons/LibraryBooks';
import PaidIcon from '@material-ui/icons/AttachMoney';
import Select from '@material-ui/core/Select';

// redux imports
import { connect } from 'react-redux';
import { getProfiles } from '../../redux/actions/profileActions';
import { getSubjects } from '../../redux/actions/subjectActions';

// MUI imports
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Input, InputLabel } from '@material-ui/core';

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
            searchData: [],
            filterByPaid: false,
            filterByVolunteer: false,
            filtering: false,
            searchText: '',
            text: '',
            orderDropDown: null,
            filterDropDown: null,
            majorsDropDown: null,
            subjects: [],
            subjectFilters: [],
            major: [],
            shuffled: false,
        };
    }

    //Functions then render
    componentDidMount() {
        this.props.getProfiles();
        this.props.getSubjects();
    }

     componentWillReceiveProps(nextProps) {
        if (nextProps.errors) this.setState({ errors: nextProps.errors });
        if (nextProps.subjects.subjects) {
            this.setState({
                subjects: _.sortBy(_.map(nextProps.subjects.subjects, 'name'))
            });
        }
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

      // sort currently displayed profiles by name alphabetically 
    orderByName = name => event => {
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
    
    // sort by Major alphabetically
    orderByMajor = e => event => {
        if (!this.state.searching) {
            var profileList = this.props.profile.profiles;
        }
        else {
            var profileList = this.state.data;
        }   
        let majorSorted = profileList.sort(function(a,b) {
            var subA = a.major[0].toLowerCase();
            var subB = b.major[0].toLowerCase();
            
            if (subA < subB) //sort string ascending
                return -1 
            if (subA > subB)
                return 1
            return 0
        })

        this.setState(state => ({
            data: majorSorted,
        })); 
    }
    

     //uses current value of search bar to find tutors based on name, major, or the courses they tutor   
     handleSearch = text => event => {   
        this.setState({
            [text]: event.target.searchText
        });
        let search_text = event.target.value;
        let profileList = this.props.profile.profiles;
        if(this.state.filtering === true){
            profileList = this.state.data;
        }
        
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
                        if(course.courseNumber === search_text && !searchList.includes(profile)){
                            searchList.push(profile);
                        }
                       //Course ID ex: CS, HST, MTH...
                        if(course.courseId.toLowerCase() === search_text.toLowerCase() && !searchList.includes(profile)) {
                            searchList.push(profile);
                        }
                        //combo of the two above... ex: CS301 or CS 301
                        if( (search_text.toLowerCase() === (course.courseId + course.courseNumber).toLowerCase() 
                        || search_text.toLowerCase() === (course.courseId + ' ' + course.courseNumber).toLowerCase()) && !searchList.includes(profile)){
                            searchList.push(profile);
                        }
                        //by full name of course
                        let courseName = course.courseName;
                        let courseNameSub = courseName.substring(0, search_text.length).toLowerCase();
                        if(courseNameSub === search_text.toLowerCase() && !searchList.includes(profile)) {
                            searchList.push(profile);
                        }
                    }
                }
                //compare first name to search text, add to list if similar
                if (firstName.length >= search_text.length){
                    let userName = firstName.substring(0, search_text.length).toLowerCase();
                    if(userName.includes(search_text.toLowerCase()) && !searchList.includes(profile)){
                        searchList.push(profile);
                    }
                }
                // by major
                let majors = profile.major;
                for(var m in majors){
                    let major = majors[m];
                    if(major.length >= search_text.length){
                        let majorSub = major.substring(0, search_text.length).toLowerCase();
                        if(search_text.toLowerCase() === majorSub && !searchList.includes(profile)){
                            searchList.push(profile);
                        }
                    }
                }
                //by minor
                let minors = profile.minor;
                for(var mi in minors){
                    let minor = minors[mi];
                    if(minor.length >= search_text.length){
                        let minorSub = minor.substring(0, search_text.length).toLowerCase();
                        if(search_text.toLowerCase() === minorSub && !searchList.includes(profile)){
                            searchList.push(profile);
                        }
                    }
                }
            }
            //updates displayed profiles with search list 
            if(searchList.length > 0){
                this.setState(state => ({
                    data: searchList,
                    searchData: searchList,
                    searching: true
                }));
            }
            else{
                console.log("No results found from search.");
            }
        }
        else { //if there is no text in search bar, don't use search list
            this.setState(state => ({
                //data: getProfiles(),
                searching: false
            }));
        }
    }

    //Returns results from profiles relating to chosen subject
    filterBySubject = (subject, event) => {
        let subjectFilterList = this.state.subjectFilters;
        let profileList = this.props.profile.profiles;
        
        // add the subject to the filter list and remove it from the subject list
        if (subject !== null) {
            subjectFilterList.push(subject);
            _.pull(this.state.subjects, subject);
            this.setState({ subjects: this.state.subjects });
        }
        
        if(this.state.searching === true){
            profileList = this.state.searchData;
        }
        
        if(subjectFilterList.length === 0){
            this.setState({
                data: profileList,
                filtering: false,
            });
        }
        else{
            let results = [];
            for(var prof in profileList){//this loop matches profiles to given subjects 
                let profile = profileList[prof];
                let majors = profile.major;
                let minors = profile.minor;
                for(var m in majors){   //add profiles by major 
                    let major = majors[m];
                    for(var e in subjectFilterList){
                        let eachSubject = subjectFilterList[e];
                        if(eachSubject === major && !results.includes(profile)){
                            results.push(profile);
                        }
                    }
                }
                for(var mi in minors){  //add by minor
                    let minor = minors[mi];
                    for(var e in subjectFilterList){
                        let eachSubject = subjectFilterList[e];
                        if(eachSubject === minor && !results.includes(profile)){
                            results.push(profile);
                        }
                    }
                }
            }
            console.log(results);
            
            this.setState({
                data: results,
                filtering: true,
            });
        }
    }
    
    filterByPaid = (paid) => event => {
        let profileList = this.props.profile.profiles;
        let paidResults = _.filter(profileList, { 'type': "Paid"});
        
        this.setState({
            data: paidResults,
            filterByPaid: true,
            filterByVolunteer: false,
        });
    }

    filterByVolunteer = (paid) => event => {
        let profileList = this.props.profile.profiles;
        let unpaidResults = _.filter(profileList, { 'type': "Volunteer"});
        
        this.setState({
            data: unpaidResults,
            filterByVolunteer: true,
            filterByPaid: false,
        });   
    }

    removePaidFilter = (paid) => event => {
        this.setState({ data: this.props.profile.profiles, filterByPaid: false});
    }

    removeVolunteerFilter = (paid) => event => {
        this.setState({ data: this.props.profile.profiles, filterByVolunteer: false});
    }

    removeSubject = (subject, event) => {
        _.pull(this.state.subjectFilters, subject);
        let subjectList = _.sortBy(_.concat(this.state.subjects, subject));
        this.setState({subjectFilters: this.state.subjectFilters, subjects: subjectList});
        this.filterBySubject(null, event);
    }

    render() {
        const { classes } = this.props;
        const { profiles, loading } = this.props.profile;
        const { orderDropDown, filterDropDown, majorsDropDown, subjects} = this.state;

        let courseMenuItems = subjects.map((subject, i) =>
                <MenuItem key={i} value={subject} onClick={(e) => this.filterBySubject(subject)}>{subject}</MenuItem>
            );

        let profileItems;

        if (profiles === null || loading) {
            profileItems = (<ProgressSpinner />)
        }
        else {  //if text in search bar, display search results
            if(this.state.searching === true || this.state.filterByPaid === true || this.state.filterByVolunteer === true || this.state.shuffled === true || this.state.filtering === true){
                
                let searchData = this.state.data;
                profileItems = searchData.length > 0 ?
                searchData.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                )) : (
                    <Grid item xs={12}>
                    <div className="padding20">
                        <Typography align="center" className="colorBlue"><WarningIcon id="warning"/> </Typography>
                        <Typography variant="h4" align="center" gutterBottom>No profiles found.</Typography>
                        <Typography variant="subtitle1" align="center">Try widening your search.</Typography>
                    </div>
                    </Grid>
                );
            }
            else { 
                let Profiles = profiles;
                profileItems = profiles.length > 0 ?
                Profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                )) : (
                    <Grid item xs={12}>
                    <div className="padding20">
                        <Typography align="center" className="colorBlue"><WarningIcon id="warning"/> </Typography>
                        <Typography variant="h4" align="center" gutterBottom>No profiles found.</Typography>
                        <Typography variant="subtitle1" align="center">Try widening your search.</Typography>
                    </div>
                    </Grid>
                );
            }
        }

        const subjectChips = this.state.subjectFilters.map((subject, index) => 
                                <Chip className="search-chip" variant="outlined" key={index} label={subject} 
                                    onDelete={(e) => this.removeSubject(subject)}/> 
                            );

        return (
            <div>
            <header>
                <Paper className="paddingMargin">
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Input id='search' placeholder="Name, Major, or Course" 
                                    value={this.state.searchText} 
                                    onChange={this.handleSearch('searchText')} 
                                    startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                                    fullWidth/>  
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="outlined" aria-haspopup="true" onClick={this.handleMajorsMenu} aria-owns={majorsDropDown ? 'majorsMenu' : undefined} fullWidth>
                                <div className="large">Subjects</div>
                                <div className="small"><SubjectIcon /></div>
                            </Button>   
                            <Menu id="majorsMenu" anchorEl={majorsDropDown} open={Boolean(majorsDropDown)} onClose={this.closeMajorsMenu}>
                                {courseMenuItems}
                            </Menu>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="outlined" aria-haspopup="true" onClick={this.handleOrderBy} aria-owns={orderDropDown ? 'orderByMenu' : undefined} fullWidth>
                                <div className="large">Order by</div>
                                <div className="small"><SortIcon /></div>
                            </Button>
                                <Menu id='orderByMenu' anchorEl={orderDropDown} open={Boolean(orderDropDown)} onClose={this.closeOrderMenu}>
                                    <MenuItem onClick={this.orderByName()}> First Name</MenuItem>
                                    <MenuItem onClick={this.orderByMajor()}> Major</MenuItem>
                                </Menu>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="outlined" aria-haspopup="true" onClick={this.handleFilterBy} aria-owns={filterDropDown ? 'filterByMenu' : undefined} fullWidth>
                                <div className="large">Paid or Volunteer</div>
                                <div className="small"><PaidIcon /></div>
                            </Button>
                                <Menu id='filterByMenu' anchorEl={filterDropDown} open={Boolean(filterDropDown)} onClose={this.closeFilterMenu}>
                                    <MenuItem value="Paid" onClick={this.filterByPaid()} variant="outlined" name="Paid"> Paid</MenuItem> 
                                    <MenuItem value="Volunteer" onClick={this.filterByVolunteer()} variant="outlined" name="Volunteer"> Volunteer</MenuItem>  
                                </Menu> 
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="outlined" onClick={this.shuffle} fullWidth>
                                <div className="large">Shuffle</div>
                                <div className="small"><ShuffleIcon /></div>
                            </Button> 
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.filterByVolunteer &&
                            <Chip className="search-chip" variant="outlined" label="Volunteer" onDelete={this.removeVolunteerFilter()}/>}
                        {this.state.filterByPaid && 
                            <Chip className="search-chip" variant="outlined" label="Paid" onDelete={this.removePaidFilter()}/>}
                        {subjectChips}
                    </Grid>
                </Paper>
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