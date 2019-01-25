import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// redux import
import { connect } from 'react-redux';

// MUI imports
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    card: {
      minWidth: 100,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

const ProfileItem = props => {
    const { classes, profile, auth } = props;

    return (
    <React.Fragment>
        <Card raised>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {profile.handle} : 
                    <Chip className={classes.chip} color="primary" variant="outlined" label={profile.user.email}/>
                    <Chip className={classes.chip} color="primary" variant="outlined" label={profile.status}/>
                    <Chip className={classes.chip} color="primary" variant="outlined" label={profile.major}/>
                </Typography>
                <Typography variant="subtitle1">
                    Classes
                </Typography>
                {profile.classes.slice(0, 5).map((myClass, index) => (
                    <Chip className={classes.chip} color="secondary" key={index} label={myClass} />
                ))}
            </CardContent>
            <CardActions>
                <Button component={Link}
                    size="small" 
                    color="inherit"
                    variant="contained"
                    to={`/profile/${profile.handle}`}
                >
                    View Profile
                </Button>
                {auth.isAuthenticated && profile.user._id === auth.user.id && 
                <Button component={Link} 
                    size="small" 
                    color="primary"
                    variant="contained"
                    to={`/edit-profile`}
                >
                    Edit Your Profile
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
