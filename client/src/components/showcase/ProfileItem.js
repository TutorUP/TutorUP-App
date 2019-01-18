import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// redux import
import { connect } from 'react-redux';

// MUI imports
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
    card: {
      minWidth: 200,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
};

const ProfileItem = props => {
    const { classes, profile, auth } = props;

    return (
    <React.Fragment>
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h4">
                    {profile.handle} {profile.status}
                </Typography>
                <Typography>
                    Classes
                </Typography>
              {profile.classes.slice(0, 4).map((myClass, index) => (
                <List key={index}>
                    <ListItemText className={classes.bullet} primary={myClass} />
                </List>
              ))}
            </CardContent>
            <CardActions>
                <Button name="viewProfile" size="small" color="secondary">
                    <Link to={`/profile/${profile.handle}`}>
                        View Profile
                    </Link>
                </Button>
                {profile.user._id === auth.user.id && 
                        <Button name="editProfile" size="small" color="secondary">
                        <Link to={'/edit-profile'}>Edit Your Profile</Link>
                        </Button>
                }
            </CardActions>
        </Card>
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
