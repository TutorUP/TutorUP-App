import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/Email';
import CalendarIcon from '@material-ui/icons/EventAvailable';
import InfoIcon from '@material-ui/icons/Info';

import './profile.css';

class ProfileAbout extends Component {

    render() {
        const { profile } = this.props;

        // Create initials and short version of name for use on card
        const firstname = profile.user.firstname;
        const lastname = profile.user.lastname;
        const initials =  (firstname && lastname) ? firstname.charAt(0) + lastname.charAt(0) : '';
        const shortname = (firstname && lastname) ? firstname + " " + lastname.charAt(0) + '.' : '';

        // Skill List
        const classes = profile.courses !== undefined ? profile.courses.map((myClass, index) => (
            <Chip key={index} label={`${myClass.courseId} ${myClass.courseNumber}: ${myClass.courseName}`} className="chip" variant="outlined" />
        )) : (
            <p>No classes defined yet.</p>
        );

        const majors = profile.major.join(", ");
        const minors = (profile.minor.length > 0) ? profile.minor.join(", ") : "";
        const headerText = profile.type === "Paid" ?
            <span>{shortname}<span className="tag">Requesting Compensation</span></span>
            : <span>{shortname}</span>;
        const subheaderText = (minors.length > 0) ? majors + " (" + minors + ")" : majors;

        return (
            <Card>
                <CardHeader
                  className="cardHeader"
                  avatar={
                    <Avatar className="purpleAvatar">
                      {initials}
                    </Avatar>
                  }
                  title={headerText}
                  subheader={subheaderText}
                />
                <CardContent>
                    <div className="spaceBelow">
                        {classes}
                    </div>

                    <Grid container wrap="nowrap" spacing={16}>
                        <Grid item>
                            <MailIcon className="icon"/>
                        </Grid>
                        <Grid item xs>
                            <Typography>{profile.user.email}</Typography>
                        </Grid>
                    </Grid>
                    {profile.bio &&
                    <Grid container wrap="nowrap" spacing={16} >
                          <Grid item>
                              <InfoIcon className="icon"/>
                          </Grid>
                          <Grid item xs>
                            <Typography>{profile.bio}</Typography>
                          </Grid>
                    </Grid>}
                    {profile.availability &&
                    <Grid container wrap="nowrap" spacing={16}>
                          <Grid item>
                              <CalendarIcon className="icon"/>
                          </Grid>
                          <Grid item xs>
                            <Typography>{profile.availability}</Typography>
                          </Grid>
                    </Grid>}
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        className="colorPurple"
                        href={`mailto:${profile.user.email}`}
                    >
                      Email Tutor
                  </Button>
                </CardActions>
            </Card>
        );    
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
