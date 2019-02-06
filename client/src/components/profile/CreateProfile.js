import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProfile, postCourse } from '../../redux/actions/profileActions';
import { getSubjects } from '../../redux/actions/subjectActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import './profile.css';

class CreateProfile extends Component {
 state = {
     major: '',
     bio: '',
     minor: '',
     availability: '',
     courses: [],
     subjects: [],
     errors: {}
 }

 componentDidMount() {
     this.props.getSubjects();
 }

 componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.subjects.subjects) {
        this.setState({
            subjects: _.sortBy(nextProps.subjects.subjects, ['id', 'name'])
        });
    }
 }

 addCourse = (e) => {
    this.setState((prevState) => ({
      courses: [...prevState.courses, {courseId: "", courseName: "", courseNumber: "", id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)}],
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

 onSubmit = e => {
     e.preventDefault();
     const { bio, major, minor, availability, courses } = this.state;
     const handle = this.props.auth.user.email.replace("@up.edu", "");

     const profileData = {
         handle,
         bio,
         major, 
         minor,
         courses,
         availability
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
      this.setState({ [courses]: courses });
    }
    else {
     this.setState({ [e.target.name]: e.target.value });
    }
 }

render() {
    const { auth } = this.props;
    const { bio, major, minor, availability, courses, subjects } = this.state;

    const minors = _.filter(subjects, ['isMinor', "Yes"]);
    const majors = _.filter(subjects, ['isMajor', "Yes"]);

    const majorMenuItems =  majors.map((major, i) =>
            <MenuItem key={i} value={major.name}>{major.name}</MenuItem>
    );
    const minorMenuItems = minors.map((minor, i) =>
            <MenuItem key={i} value={minor.name}>{minor.name}</MenuItem>
    );
    const courseMenuItems = subjects.map((subject, i) =>
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
                        <Select value={course.courseId} onChange={this.onChange} variant="outlined" name={courseId} id="courseId">
                            <MenuItem value=""></MenuItem>
                            {courseMenuItems}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" required maxLength="3" fullWidth>
                          <InputLabel htmlFor={courseNumber}>Course Number</InputLabel>
                          <Input id="courseNumber" name={courseNumber} value={course.courseNumber} onChange={this.onChange} type="number">
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
           )}  
    );

    return (
      <div className="padding20">
            <Typography variant="h4" component="h1" align="center" className="editHeading">
                Create Profile
            </Typography>
            <form onSubmit={this.onSubmit}>    
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="major">Major(s)</InputLabel>
                            <Select value={major} onChange={this.onChange} variant="outlined" inputProps={{
                                name: 'major',
                                id: 'major'
                            }}>
                                <MenuItem value=""></MenuItem>
                                {majorMenuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="minor">Minor(s)</InputLabel>
                            <Select value={minor || ''} onChange={this.onChange} inputProps={{
                                name: 'minor',
                                id: 'minor'
                            }}>
                                <MenuItem value=""></MenuItem>
                                {minorMenuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl margin="normal" fullWidth>
                          <InputLabel htmlFor="bio">Short Bio</InputLabel>
                          <Input type="text" id="bio" name="bio" value={bio} multiline fullWidth onChange={this.onChange}>
                          </Input>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl margin="normal" fullWidth>
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
                        <Button align="right" type="cancel" className="button">Cancel</Button>
                    </Grid> 
                    <Grid item>   
                        <Button align="right" type="submit" variant="outlined" color="inherit" className="button">Submit</Button>
                    </Grid>
                </Grid>
            </form>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    subjects: state.subjects,
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { createProfile, postCourse, getSubjects })(withRouter(CreateProfile));
