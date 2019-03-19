import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { createProfile, getCurrentProfile } from '../../redux/actions/profileActions';
import { getSubjects } from '../../redux/actions/subjectActions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import './profile.css';
import { filterArrDuplicates, sortArrByAscending, filterByOptions, findFirstMatch } from '../../utils/lodashOps';

class EditProfile extends Component {
 state = {
     major: [],
     bio: '',
     type: '',
     minor: [],
     availability: '',
     courses: [],
     subjects: [],
     errors: {}
 }

 componentDidMount() {
     this.props.getCurrentProfile();
     this.props.getSubjects();
 }

 componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;
        const courses = profile.courses.length > 0 ? profile.courses : [];
        this.setState({
            major: profile.major,
            minor: profile.minor,
            bio: profile.bio,
            availability: profile.availability,
            type: profile.type,
            courses: courses
        });
    }
    if (nextProps.subjects.subjects) {
        this.setState({
            subjects: sortArrByAscending(nextProps.subjects.subjects, ['name'])
        });
    }
 }

 addCourse = (e) => {
    const newCourse = {
        courseId: "",
        courseName: "",
        courseNumber: "",
        courseSubject: "",
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
    }

    this.setState((prevState) => ({
      courses: [...prevState.courses, newCourse],
    }));
 }

 removeCourse = id => {
    let courses = [...this.state.courses];
    const newCourses = courses.filter(course => {
        return course.id !== id
    });

    this.setState({
        courses: [...newCourses]
    });

    if(newCourses.length === 0) {
        console.log('No courses');
    }

 }

 numberOnly = (e) => {
   console.log(e.charCode);
   return (e.charCode >= 48 && e.charCode <= 57);
 }

 onSubmit = (e) => {
     e.preventDefault();
     const { bio, major, minor, availability, courses, type } = this.state;

     const profileData = {
         bio,
         major, 
         minor,
         courses,
         availability,
         type
     }

     this.props.createProfile(profileData, this.props.history);
 }

 onChange = e => {
    const name = e.target.name;
    if (name.includes("courseId") || name.includes("courseNumber") || name.includes("courseName")) {
      let courses = [...this.state.courses];
      let i = name.charAt(name.length - 1);
      let property = name.substring(0, name.length - 2);
      courses[i][property] = e.target.value;

      // if we just set the course ID property, also set the subject name
      if (property === "courseId") {
        let subject = findFirstMatch(this.state.subjects, ['id', e.target.value]);
        courses[i].courseSubject = subject.name;
      }
      this.setState({ [courses]: courses });
    }
    else {
        const { major, minor } = this.state;
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === 'major') {
            const filtered = filterArrDuplicates(minor, e.target.value)
            this.setState({ minor: filtered})
        }
        else if (e.target.name === 'minor') {
            const filtered = filterArrDuplicates(major, e.target.value)
            this.setState({ major: filtered})
        }
    }
 }

// on cancel go back to dashboard to eliminate need for extra button
render() {
    const { bio, major, minor, availability, courses, subjects, type } = this.state;

    const minors = filterByOptions(subjects, ['isMinor', "Yes"]);
    const majors = filterByOptions(subjects, ['isMajor', "Yes"]);
    const subjectItems = filterByOptions(subjects, ['isCourse', "Yes"]);

    const majorMenuItems =  majors.map((major, i) =>
            <MenuItem key={i} value={major.name}>{major.name}</MenuItem>
    );
    const minorMenuItems = minors.map((minor, i) =>
            <MenuItem key={i} value={minor.name}>{minor.name}</MenuItem>
    );
    const courseMenuItems = subjectItems.map((subject, i) =>
            <MenuItem key={i} value={subject.id}>{subject.id}</MenuItem>
    );

    const courseItems = courses.map((course, i) => {
            let courseNumber = "courseNumber-" + i;
            let courseId = "courseId-" + i;
            let courseName = "courseName-" + i; 

            return  (
              <Grid item xs={12} sm={6} md={4} key={i}>
               <Card className="card" elevation={0}>
                  <CardContent>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor={courseId}>Course Identifier</InputLabel>
                        <Select value={course.courseId} onChange={this.onChange} variant="outlined" name={courseId} id="courseId"
                          MenuProps={{ style: {maxHeight: 300} }}>
                            {courseMenuItems}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" required maxLength="3" fullWidth>
                          <InputLabel htmlFor={courseNumber}>Course Number</InputLabel>
                          <Input id="courseNumber" name={courseNumber} value={course.courseNumber} onChange={this.onChange}
                          type="number" inputProps={{  min: 1, step: 1, pattern: '[0-9]', max: 999 }}>
                          </Input>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor={courseName}>Course Name</InputLabel>
                        <Input id="courseName" name={courseName} value={course.courseName} onChange={this.onChange}>
                        </Input>
                    </FormControl>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={(e) => this.removeCourse(course.id)}>Remove Course</Button>
                  </CardActions>
                </Card>
             </Grid> 
           )});  

    return (
      <div className="padding20">
            <Typography variant="h4" component="h1" align="center" className="editHeading">
                Edit Profile
            </Typography>
             <form onSubmit={this.onSubmit}>    
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="major">Major(s)</InputLabel>
                            <Select required multiple value={major} onChange={this.onChange} variant="outlined" MenuProps={{ style: {maxHeight: 300} }} 
                              inputProps={{
                                  name: 'major',
                                  id: 'major'
                              }}>
                                {majorMenuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="minor">Minor(s)</InputLabel>
                            <Select multiple value={minor || []} onChange={this.onChange} MenuProps={{ style: {maxHeight: 300} }} inputProps={{
                                name: 'minor',
                                id: 'minor'
                            }}>
                                {minorMenuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="type">Paid or volunteer?</InputLabel>
                            <Select required value={type || ''} onChange={this.onChange} MenuProps={{ style: {maxHeight: 300} }} inputProps={{
                                name: 'type',
                                id: 'type'
                            }}>
                                <MenuItem value=""></MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Volunteer">Volunteer</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl margin="normal" required fullWidth>
                          <InputLabel htmlFor="bio">Short Bio</InputLabel>
                          <Input type="text" id="bio" name="bio" value={bio} multiline fullWidth onChange={this.onChange}>
                          </Input>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl margin="normal" required fullWidth>
                          <InputLabel htmlFor="availability">Availablity</InputLabel>
                          <Input type="text" id="availability" name="availability" value={availability} multiline fullWidth onChange={this.onChange}>
                          </Input>
                        </FormControl>
                    </Grid>
                 </Grid>
                 <Grid container spacing={24}>
                   <Grid item xs={12}>
                       <div className="courses"></div>
                   </Grid>
                   {courseItems}
                   <Grid item xs={12}>
                       <Button aria-label="Add Course" variant="outlined" onClick={this.addCourse}>
                          Add a Course 
                       </Button>
                   </Grid>
                </Grid>  
                <Grid container justify="flex-end" spacing={24}>
                    <Grid item>
                        <Button aria-label="Cancel" align="right" type="cancel" className="Button" component={Link} to="/profile">
                          Cancel
                        </Button>
                    </Grid> 
                    <Grid item>   
                        <Button align="right" type="submit" variant="outlined" color="inherit" className="button">Submit</Button>
                    </Grid>
                </Grid>
            </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getSubjects: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    subjects: state.subjects,
    errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile, getSubjects })(withRouter(EditProfile));
