import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import components
import ProgressSpinner from '../common/ProgressSpinner';
import ProfileItem from './ProfileItem';

// redux imports
import { connect } from 'react-redux';
import { getProfiles } from '../../redux/actions/profileActions';

// MUI imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class ProfilesShowcase extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile;
        let profileItems;

        if (profiles === null || loading) {
            profileItems = <h1>Loading Profiles...</h1>
        }
        else {
            profileItems = profiles.length > 0 ?

                profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                )) : (
                    <div>
                        <h1>No Profiles To List</h1>
                    </div>
                );
        }

        return (
            <Grid>
                <h1>Tutor Profiles</h1>
                {profileItems}
            </Grid>
        );
    }
}

ProfilesShowcase.propTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(ProfilesShowcase)