import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// redux import
import { connect } from 'react-redux';

// MUI imports
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/Email';
import TagIcon from '@material-ui/icons/LocalOffer';
import CalendarIcon from '@material-ui/icons/EventAvailable';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
    card: {
      minWidth: 100,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: '#1E1656',
     },
     purpleText: {
         color: '#1E1656'
     }
});

const ProfileItem = props => {
    const { classes, profile, auth } = props;

    const classesCard = profile.courses !== undefined ? (
        <React.Fragment>
            {profile.courses.slice(0, 5).map((myClass, index) => (
                <Chip className={classes.chip} key={index} label={`${myClass.courseId} ${myClass.courseNumber}`} />
            ))}
        </React.Fragment>

    ) : (
        <p>No classes listed</p>
    )

    // Create initials and short version of name for use on card
    const firstname = profile.user.firstname;
    const lastname = profile.user.lastname;
    const initials =  (firstname && lastname) ? firstname.charAt(0) + lastname.charAt(0) : '';
    const shortname = (firstname && lastname) ? firstname + " " + lastname.charAt(0) + '.' : '';

    return (
    <React.Fragment>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
                <CardHeader
                  className="cardHeader"
                  avatar={
                    <Avatar className={classes.purpleAvatar}>
                      {initials}
                    </Avatar>
                  }
                  title={shortname}
                  subheader={profile.major}
                />
                <CardContent>
                    <div className="spaceBelow">
                        {classesCard}
                    </div>

                    <Grid container wrap="nowrap" spacing={16}>
                        <Grid item>
                            <MailIcon />
                        </Grid>
                        <Grid item xs>
                            <Typography>{profile.user.email}</Typography>
                        </Grid>
                    </Grid>

                    {/*<Grid container wrap="nowrap" spacing={16}>
                        <Grid item>
                            <TagIcon />
                        </Grid>
                        <Grid item xs>
                            <Typography>Tags will be listed here if we do them</Typography>
                        </Grid>
                    </Grid> */}

                    <Grid container wrap="nowrap" spacing={16}>
                          <Grid item>
                              <InfoIcon />
                          </Grid>
                          <Grid item xs>
                            <Typography>{profile.bio}</Typography>
                          </Grid>
                    </Grid>

                    <Grid container wrap="nowrap" spacing={16}>
                          <Grid item>
                              <CalendarIcon />
                          </Grid>
                          <Grid item xs>
                            <Typography>{profile.availability}</Typography>
                          </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                <Button component={Link}
                    size="small"
                    color="inherit"
                    to={`/profile/${profile.handle}`}
                >
                    View Profile
                </Button>
                {auth.isAuthenticated && profile.user._id === auth.user.id &&
                <Button component={Link}
                    size="small"
                    to={`/edit-profile`}
                    className={classes.purpleText}
                >
                    Edit Profile
                </Button>
                }
                </CardActions>
            </Card>
        </Grid>
    </React.Fragment>
  );
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(ProfileItem));
