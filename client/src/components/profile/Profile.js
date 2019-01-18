import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// components
import ProgressSpinner from '../common/ProgressSpinner';
import ProfileAbout from './ProfileAbout';
import ProfileAvailability from './ProfileAvailability';

// MUI imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// Redux imports
import { getProfileByHandle } from '../../redux/actions/profileActions';
import { connect } from 'react-redux';


const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
          width: 1100,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    header: {
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
    },
    profileFeatured: {
        padding: `${theme.spacing.unit * 6}px`,
        [theme.breakpoints.up('md')]: {
          paddingRight: 0,
        },
      },
})

class Profile extends Component {

componentDidMount() {
    if (this.props.match.params.handle) {
        this.props.getProfileByHandle(this.props.match.params.handle);
    }
}

componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
        this.props.history.push('/not-found');
    }
}

render() {
    const { profile, loading } = this.props.profile;
    const { classes } = this.props;
    let profileContent;
    
    profileContent = (profile === null || loading) ? <ProgressSpinner /> : (
        <div>
            <ProfileAbout profile={profile} />
        </div>
    );

    return (
        <div>{profileContent}</div>
    );
  }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(withStyles(styles)(Profile));
