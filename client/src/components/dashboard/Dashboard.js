import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {

    componentDidMount() {

    }

    render() {
        return (
        <div>
            <h1>Dashboard</h1>
        </div>
        )
    }
}

export default connect(null, { getCurrentProfile })(Dashboard);
