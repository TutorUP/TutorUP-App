import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import components
import ProgressSpinner from '../common/ProgressSpinner';

// redux imports
import { connect } from 'react-redux';
import { getProfiles } from '../../redux/actions/profileActions';

class ProfilesShowcase extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile;
        let profileItems;

        if (profiles === null || loading) {
            profileItems = <ProgressSpinner />
        }
        else {
            profileItems = profiles.length > 0 ? (
                <div>
                    <h1>Profiles Listed Here</h1>
                </div>

            ) : 
            (
                <div>
                    <h1>No Profiles To List</h1>
                </div>
            )
        }

        return (
            <div>
                <h1>Tutor Profiles</h1>
                {profileItems}
            </div>
        );
    }
}

ProfilesShowcase.propTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(ProfilesShowcase)