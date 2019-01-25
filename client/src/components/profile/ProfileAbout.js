import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../utils/is-empty';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
        const classes = profile.classes.map((myClass, index) => (
            <Chip key={index} label={myClass} className="chip" variant="outlined" />
        ));

        return (
            <Card>
                <CardHeader
                  className="cardHeader"
                  avatar={
                    <Avatar>
                      {initials}
                    </Avatar>
                  }
                  title={shortname}
                  subheader={profile.major}
                />
                <CardContent>
                    <div className="spaceBelow">
                        {classes}
                    </div>

                    <Grid container wrap="nowrap" spacing={16}>
                        <Grid item>
                            <FontAwesomeIcon icon="envelope" className="icon" />
                        </Grid>
                        <Grid item xs>
                            <Typography>{profile.user.email}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container wrap="nowrap" spacing={16}>
                        <Grid item>
                            <FontAwesomeIcon icon="tag" className="icon" />
                        </Grid>
                        <Grid item xs>
                            <Typography>Tags will be listed here if we do them</Typography>
                        </Grid>
                    </Grid>

                    <Grid container wrap="nowrap" spacing={16}>
                          <Grid item>
                              <FontAwesomeIcon icon="info-circle" className="icon" />
                          </Grid>
                          <Grid item xs>
                            <Typography>{profile.bio}</Typography>
                          </Grid>
                    </Grid>

                    <Grid container wrap="nowrap" spacing={16}>
                          <Grid item>
                              <FontAwesomeIcon icon="calendar-check" className="icon" />
                          </Grid>
                          <Grid item xs>
                            <Typography>{profile.availability}</Typography>
                          </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );    
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
