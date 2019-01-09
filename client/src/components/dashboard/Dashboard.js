import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import ProgressSpinner from '../common/ProgressSpinner';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <ProgressSpinner />
        }
        else {
            dashboardContent = (
                <React.Fragment>
                    <Typography>Welcome {user.name}</Typography>
                </React.Fragment>
            )
        }




        return (
        <React.Fragment>
            <Grid container spacing={10} alignItems="flex-end">
            <Card>
                <CardContent>
                    {dashboardContent}
                </CardContent>
            </Card>
            </Grid>
        </React.Fragment>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
