import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import ProgressSpinner from '../common/ProgressSpinner';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    root: {
      width: '100%',
      maxWidth: 500,
    },
  };

class Dashboard extends Component {
    state = {
        snackbar: false
    }

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
                        <Grid container justify="center" alignItems="center">
                            <Typography variant="h2" gutterBottom>Welcome {user.name}</Typography>
                            <Typography variant="subtitle1" gutterBottom>You have not yet setup a profile, please add some info</Typography>
                            <Link to="/create-profile" className="btn btn-lg btn-info">
                                Create Profile
                            </Link>
                        </Grid>
            );
        }

        return (
        <React.Fragment>
            <Grid container alignItems="flex-end">
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

export default connect(mapStateToProps, { getCurrentProfile })(withStyles(styles)(Dashboard));
