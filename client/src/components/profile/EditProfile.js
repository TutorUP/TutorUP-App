import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { createProfile, getCurrentProfile } from '../../redux/actions/profileActions';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import './profile.css';
import classList from '../common/ClassList';

class EditProfile extends Component {
 state = {
     handle: '',
     major: '',
     bio: '',
     classes: '',
     status: '',
     minor: '',
     errors: {}
 }

 componentDidMount() {
     this.props.getCurrentProfile();
 }

 componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;
        let profileClasses = profile.classes ? profile.classes.toString() : '';

        this.setState({
            handle: profile.handle,
            major: profile.major,
            bio: profile.bio,
            classes: profileClasses,
            status: profile.status,
        });
    }
 }

 onSubmit = e => {
     e.preventDefault();
     const { handle, bio, classes, major, minor, status } = this.state;

     const profileData = {
         handle,
         bio,
         classes,
         major, 
         minor,
         status
     }

     this.props.createProfile(profileData, this.props.history);
 }

 onChange = e => {
     this.setState({ [e.target.name]: e.target.value });
 }

// on cancel go back to dashboard to eliminate need for extra button
render() {
    const majors = classList.classList.majors;
    const minors = classList.classList.minors;

    const { handle, bio, classes, major, status } = this.state;

    const majorMenuItems =  majors.map((major, i) =>
            <MenuItem key={i} value={major}>{major}</MenuItem>
    );
    const minorMenuItems = minors.map((minor, i) =>
            <MenuItem key={i} value={minor}>{minor}</MenuItem>
    );

    return (
      <div className="padding20">
            <Typography variant="h4" component="h1" align="center">
                Edit Profile
            </Typography>
            <form onSubmit={this.onSubmit}>    
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6} md={3}>
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
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="minor">Minor(s)</InputLabel>
                            <Select value={major} onChange={this.onChange} inputProps={{
                                name: 'minor',
                                id: 'minor'
                            }}>
                                <MenuItem value=""></MenuItem>
                                {minorMenuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="major">Class Standing</InputLabel>
                            <Select value={status} onChange={this.onChange} inputProps={{
                                name: 'status',
                                id: 'status'
                            }}>
                                <MenuItem value=""></MenuItem>
                                <MenuItem value={'Freshman'}>Freshman</MenuItem>
                                <MenuItem value={'Sophomore'}>Sophomore</MenuItem>
                                <MenuItem value={'Junior'}>Junior</MenuItem>
                                <MenuItem value={'Senior'}>Senior</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="classes">Classes</InputLabel>
                            <Input id="classes" name="classes" value={classes} onChange={this.onChange} placeholder="Add comma-separated classes...">
                            </Input>
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
                        <InputLabel htmlFor="available">Availablity</InputLabel>
                        <Input type="text" id="available" name="available" value={bio} multiline fullWidth onChange={this.onChange}>
                        </Input>
                    </FormControl>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" spacing={24}>
                    <Grid item>
                        <Button align="right" type="cancel">Cancel</Button>
                    </Grid> 
                    <Grid item>   
                        <Button align="right" type="submit" variant="outlined" color="inherit">Submit</Button>
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
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
