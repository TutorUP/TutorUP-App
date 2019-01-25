import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProfile } from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class CreateProfile extends Component {
 state = {
     major: '',
     bio: '',
     classes: '',
     status: '',
     minor: '',
     errors: {}
 }

 onSubmit = e => {
     e.preventDefault();
     const handle = this.props.auth.user.email.split('@')[0];
     const { bio, classes, major, minor, status } = this.state;

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

render() {
    const { classes, auth } = this.props;
    const myHandle = auth.user.email.split('@')[0];

    return (
      <div>
        <Grid container>
            <Grid item xs={12}>
                <Paper elevation={1}>
                    <Typography variant="h4" component="h1">
                        Create Your Profile
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Add some information to make you stand out
                    </Typography>
                    <form onSubmit={this.onSubmit}>
                        <FormControl margin="normal" required>
                            <InputLabel htmlFor="handle">Profile Handle</InputLabel>
                            <Input id="handle" 
                            name="handle" 
                            placeholder="Name within email"
                            value={myHandle}
                            readOnly
                            >
                            </Input>
                        </FormControl>
                        <FormControl margin="normal" required>
                            <InputLabel htmlFor="major">Major</InputLabel>
                            <Select value={this.state.major} onChange={this.onChange} inputProps={{
                                name: 'major',
                                id: 'major'
                            }}>
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Computer Science'}>Computer Science</MenuItem>
                                <MenuItem value={'Biology'}>Biology</MenuItem>
                                <MenuItem value={'Mathematics'}>Mathematics</MenuItem>
                  
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" required>
                            <InputLabel htmlFor="classes">Classes</InputLabel>
                            <Input id="classes" name="classes" onChange={this.onChange} placeholder="Add comma-separated classes...">
                            </Input>
                        </FormControl>
                        <FormControl margin="normal" required>
                            <InputLabel htmlFor="major">Status</InputLabel>
                            <Select value={this.state.status} onChange={this.onChange} inputProps={{
                                name: 'status',
                                id: 'status'
                            }}>
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Freshman'}>Freshman</MenuItem>
                                <MenuItem value={'Sophomore'}>Sophomore</MenuItem>
                                <MenuItem value={'Junior'}>Junior</MenuItem>
                                <MenuItem value={'Senior'}>Senior</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" fullWidth variant="outlined">
                            <InputLabel htmlFor="bui">Short Bio</InputLabel>
                            <Input type="text" id="bio" name="bio" multiline fullWidth onChange={this.onChange}>
                            </Input>
                        </FormControl>
                        <Button type="submit" variant="outlined" color="inherit">Submit</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>

        
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
    errors: state.errors,
    auth: state.auth

})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
