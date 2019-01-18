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
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';

const styles = {
    card: {
        minWidth: 300,
    },
};

class ProfilesShowcase extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const { classes } = this.props;
        const { profiles, loading } = this.props.profile;
        let profileItems;

        if (profiles === null || loading) {
            profileItems = (
            <ProgressSpinner />

        )
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
            <Card className={classes.card}>
                <Typography variant="h2" gutterBottom>Tutor Profiles</Typography>
                {profileItems}
            </Card>
        );
    }
}

ProfilesShowcase.propTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(withStyles(styles)(ProfilesShowcase))