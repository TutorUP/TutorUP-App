import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import ProgressSpinner from '../common/ProgressSpinner';
import ProfileAbout from './ProfileAbout';

// Redux imports
import { getProfileByHandle } from '../../redux/actions/profileActions';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
