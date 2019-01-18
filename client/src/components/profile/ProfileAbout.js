import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../utils/is-empty';

class ProfileAbout extends Component {
    
    render() {
        const { profile } = this.props;

        // Get first name
        const firstName = profile.user.name;

        // Skill List
        const classes = profile.classes.map((myClass, index) => (
        <div key={index} className="p-3">
            <i className="fa fa-check" /> {myClass}
        </div>
        ));

        return (
        <div className="row">
            <div className="col-md-12">
            <div className="card card-body bg-light mb-3">
                <h1 className="text-center text-info">{profile.user.email}</h1>
                <h3 className="text-center text-info">{firstName}'s Bio</h3>
                <p className="lead">
                {isEmpty(profile.bio) ? (
                    <span>{firstName} does not have a bio</span>
                ) : (
                    <span>{profile.bio}</span>
                )}
                </p>
                <hr />
                <h3 className="text-center text-info">Class Set</h3>
                <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {classes}
                </div>
                </div>
            </div>
            </div>
        </div>
        );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
