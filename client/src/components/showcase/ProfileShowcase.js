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

// redux imports
import { connect } from 'react-redux';
import { getProfiles, getFilteredProfiles, setSearchString } from '../../redux/actions/profileActions';
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
            data: [],                    // this is the current list of profiles
            allProfiles: [],             // this is the full list of profiles
            searching: false,            // whether or not we are searching
            searchData: [],              // results from searching through all profiles
            filterByPaid: false,         // whether or not we are filtering by paid
            filterByVolunteer: false,    // whether or not we are filtering by volunteer
            filtering: false,            // whether or not we are filtering
            searchText: '',              // the text typed in the search bar
            orderDropDown: null,         // order by dropdown
            filterDropDown: null,        // paid or volunteer dropdown
            majorsDropDown: null,        // majors dropdown
            subjects: [],                // all subjects
            subjectFilters: [],          // currentl list of selected subjects
            shuffled: false,             // whether or not we are shuffling
        };
    }

    //Functions then render
    componentDidMount() {
        this.props.getSubjects();

        if (sessionStorage.length > 0) {
            this.props.getProfiles();
            this.setState({
                subjectFilters: JSON.parse(sessionStorage.getItem('subjectFilters')),
                searchData: JSON.parse(sessionStorage.getItem('searchData')),
                searchText: sessionStorage.getItem('searchText') === `""` ? '' : sessionStorage.getItem('searchText').replace(/[""]+/g, ''),
                filterByPaid: sessionStorage.getItem('filterByPaid') == 'true',
                filterByVolunteer: sessionStorage.getItem('filterByVolunteer') == 'true'
            }, () => this.runAllFilters())
        }
        else {
            this.props.getProfiles();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) this.setState({ errors: nextProps.errors });
        if (nextProps.subjects.subjects) {
            this.setState({
                subjects: _.sortBy(_.map(nextProps.subjects.subjects, 'name'))
            });
        }
        if (nextProps.profile.profiles) {
            this.setState({
                allProfiles: nextProps.profile.profiles
            });
        }
     }

    //for randomizing profiles displayed
    shuffle = event => {
        this.setState({
            data: _.shuffle(this.state.data),
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
    orderByName = event => {
        let nameSorted = _.orderBy(this.state.data, 'user.firstname', 'asc');

        this.setState(state => ({
            data: nameSorted,
        })); 
    }
    
    // sort by Major alphabetically
    orderByMajor = event => {
        let majorSorted = _.orderBy(this.state.data, 'major[0]', 'asc');

        this.setState(state => ({
            data: majorSorted,
        })); 
    }
    

     //uses current value of search bar to find tutors based on name, major, or the courses they tutor   
     handleSearch = text => event => {   
        this.setState({
            [text]: event.target.searchText,
            searchText: event.target.value
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
                       
                        // //By Name of Subject
                        if(course.courseSubject){
                            let courseSubjectsub = course.courseSubject.substring(0, search_text.length).toLowerCase();
                            if( search_text.toLowerCase() === courseSubjectsub && !searchList.includes(profile) ){
                                searchList.push(profile);
                            }
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
            // set search data to search list, then check other filters
            if(searchList.length > 0){
                this.setState(state => ({
                    searchData: searchList,
                    searching: true
                }), () => this.runAllFilters());
            }
            else {
                console.log("No results found from search.");
            }
        }
        else { // if there is no text in search bar, just check other filters
            this.props.getProfiles()
            this.setState(state => ({
                searching: false
            }), () => this.runAllFilters());
        }
    }

    //Returns results from profiles relating to chosen subject
    filterBySubject = (subject, event) => {
        let subjectFilterList = this.state.subjectFilters;
        subjectFilterList.push(subject);

        this.setState({
            subjectFilters: subjectFilterList,
            filtering: true,
        }, () => this.runAllFilters());
    }
    
    filterByPaid = (paid) => event => {
        this.setState({
            filterByPaid: true,
            filterByVolunteer: false,
        }, () => this.runAllFilters());
    }

    filterByVolunteer = (paid) => event => {
        this.setState({
            filterByVolunteer: true,
            filterByPaid: false,
        }, () => this.runAllFilters());
    }

    removePaidFilter = (paid) => event => {
        this.setState({ filterByPaid: false}, () => this.runAllFilters());
    }

    removeVolunteerFilter = (paid) => event => {
        this.setState({ filterByVolunteer: false}, () => this.runAllFilters());
    }

    removeSubject = (subject, event) => {
        _.pull(this.state.subjectFilters, subject);
        this.setState({ subjectFilters: this.state.subjectFilters }, () => this.runAllFilters());
    }

    runAllFilters() {
        const { searchText, searchData, allProfiles, filterByPaid, filterByVolunteer, subjectFilters } = this.state;
        // use the search data to start if there is search text, if not use the full list
        let profiles = searchText.length > 0 ? searchData : allProfiles;

        // check for paid and volunteer
        if (filterByPaid) {
            profiles = _.filter(profiles, { 'type' : "Paid" });
        }

        if (filterByVolunteer) {
            profiles = _.filter(profiles, { 'type' : "Volunteer" });
        }

        // check subjects
        let subjectFilterList = subjectFilters;
        if (subjectFilterList.length > 0) {
            let results = [];

            //this loop matches profiles to given subjects 
            for(let prof in profiles){
                let profile = profiles[prof];
                let majors = profile.major;
                let minors = profile.minor;
                let courses = profile.courses;

                for(let e in subjectFilterList){
                    let eachSubject = subjectFilterList[e];
                    for(let m in majors){   //add profiles by major 
                        let major = majors[m];
                        if(eachSubject === major && !results.includes(profile)){
                            results.push(profile);
                        }
                    }
                    for(var mi in minors){  //add by minor
                        let minor = minors[mi];
                        if(eachSubject === minor && !results.includes(profile)){
                            results.push(profile);
                        }
                    }
                    for(var c in courses){  //add by course subject
                        let courseSubject = courses[c].courseSubject;
                        if(eachSubject === courseSubject && !results.includes(profile)){
                            results.push(profile);
                        }
                    }
                }
              
            }
            this.setState({ data: results });
            profiles = results;
        }

        this.setState({ data: profiles });
    };

    saveFilters = () => {
        const { subjectFilters, searchText, searchData, filterByPaid, filterByVolunteer } = this.state;
        sessionStorage.setItem('subjectFilters', JSON.stringify(subjectFilters));
        sessionStorage.setItem('searchText', JSON.stringify(searchText))
        sessionStorage.setItem('filterByPaid', JSON.stringify(filterByPaid))
        sessionStorage.setItem('filterByVolunteer', JSON.stringify(filterByVolunteer))
        sessionStorage.setItem('searchData', JSON.stringify(searchData))
    }

    render() {
        const { profiles, loading } = this.props.profile;
        const { orderDropDown, filterDropDown, majorsDropDown, subjects, data} = this.state;

        let courseMenuItems = subjects.map((subject, i) =>
                <MenuItem key={i} value={subject} 
                        disabled={_.includes(this.state.subjectFilters, subject)}
                        onClick={(e) => this.filterBySubject(subject)}>{subject}</MenuItem>
            );

        let subjectChips = this.state.subjectFilters.map((subject, index) => 
                                <Chip className="search-chip" variant="outlined" key={index} label={subject} 
                                    onDelete={(e) => this.removeSubject(subject)} /> 
                            );
        let profileItems;

        const profileContent = data.length > 0 ? 
            data.map(profile => (
                <ProfileItem key={profile._id} profile={profile} onClick={this.saveFilters}/>
            )) : (
                <Grid item xs={12}>
                    <div className="padding20">
                        <Typography align="center" className="colorBlue"><WarningIcon id="warning"/> </Typography>
                        <Typography variant="h4" align="center" gutterBottom>No profiles found.</Typography>
                        <Typography variant="subtitle1" align="center">Try widening your search.</Typography>
                    </div>
                </Grid>
            )

        if (profiles === null || loading) {
            profileItems = <ProgressSpinner />
        }
        else {  //if text in search bar, display search results
            profileItems = (
                <Grid container spacing={24}>
                    {profileContent}
                </Grid>
            )
        }

        return (
            <React.Fragment>
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
                            <Menu id="majorsMenu" anchorEl={majorsDropDown} open={Boolean(majorsDropDown)} onClose={this.closeMajorsMenu} PaperProps={{ style: {maxHeight: 300} }}>
                                {courseMenuItems}
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
                            <Button variant="outlined" aria-haspopup="true" onClick={this.handleOrderBy} aria-owns={orderDropDown ? 'orderByMenu' : undefined} fullWidth>
                                <div className="large">Order by</div>
                                <div className="small"><SortIcon /></div>
                            </Button>
                                <Menu id='orderByMenu' anchorEl={orderDropDown} open={Boolean(orderDropDown)} onClose={this.closeOrderMenu}>
                                    <MenuItem onClick={this.orderByName}> First Name</MenuItem>
                                    <MenuItem onClick={this.orderByMajor}> Major</MenuItem>
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
                {profileItems}
            </div>
        </React.Fragment>
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

export default connect(mapStateToProps, { getProfiles, setSearchString, getFilteredProfiles, getSubjects })(withStyles(styles)(ProfilesShowcase))