import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProfile } from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { studentMajorsOptions } from '../../utils/constants';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { FormControl, Input, InputLabel, TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class CreateProfile extends Component {
 state = {
     handle: '',
     major: '',
     bio: '',
     classes: '',
     status: '',
     minor: '',
     errors: {}
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

     console.log(profileData)

     this.props.createProfile(profileData, this.props.history);
 }

 onChange = e => {
     this.setState({ [e.target.name]: e.target.value });
 }

render() {
    const { classes } = this.props;


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
                    <form className={classes.root} onSubmit={this.onSubmit}>
                        <FormControl className={classes.formControl} margin="normal" required>
                            <InputLabel htmlFor="handle">Profile Handle</InputLabel>
                            <Input id="handle" name="handle" onChange={this.onChange}>
                            </Input>
                        </FormControl>
                        <FormControl className={classes.formControl} margin="normal" required>
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
                        <FormControl className={classes.formControl} margin="normal" required>
                            <InputLabel htmlFor="classes">Classes</InputLabel>
                            <Input id="classes" name="classes" onChange={this.onChange}>
                            </Input>
                        </FormControl>
                        <FormControl className={classes.formControl} margin="normal" required>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Input id="status" name="status" onChange={this.onChange}>
                            </Input>
                        </FormControl>
                        <FormControl className={classes.formControl} margin="normal" fullWidth variant="outlined">
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

})

export default connect(mapStateToProps, { createProfile })(withRouter(withStyles(styles)(CreateProfile)));
