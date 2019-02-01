import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressSpinner from '../common/ProgressSpinner';

import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../redux/actions/profileActions';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
      minWidth: 300,
      margin: 100
    },
    marginBottom20: {
        marginBottom: 20,
    },
    purpleHeader: {
        margin: 10,
        color: '#fff',
        backgroundColor: '#1E1656',
     },
     purpleText: {
         color: '#1E1656'
     },
     media: {
        objectFit: 'cover',
     },
});

class Dashboard extends Component {
    componentDidMount() {
        const { profile } = this.props;
        if (Object.keys(profile).length > 0 ) this.props.getCurrentProfile();
    }

    onDeleteClick = e => {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        const { classes } = this.props;
        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <ProgressSpinner />
        }
        else {
            dashboardContent = Object.keys(profile).length > 0 ? (
                <Grid container spacing={24} justify="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={styles.card}>
                            <CardActionArea>
                                <CardMedia
                                  component="img"
                                  alt="tutoring"
                                  className={classes.media}
                                  height="140"
                                  image="./tutor2.png"
                                />
                            </CardActionArea>
                            <CardActions>
                                <Button component={Link} to={'/edit-profile'}>
                                    Edit Profile
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={styles.card}>
                            <CardActionArea>
                                <CardMedia
                                  component="img"
                                  alt="tutoring"
                                  className={classes.media}
                                  height="140"
                                  image="./tutor1.png"
                                />
                            </CardActionArea>
                            <CardActions>
                                <Button component={Link} to={`/profile/${profile.handle}`}>
                                    View Profile
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={styles.card}>
                            <CardActionArea>
                                <CardMedia
                                  component="img"
                                  alt="tutoring"
                                  className={classes.media}
                                  height="140"
                                  image="./tutor3.png"
                                />
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" onClick={this.onDeleteClick}>
                                    Delete Account
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={24} justify="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={styles.card}>
                            <CardActionArea>
                                <CardMedia
                                  component="img"
                                  alt="tutoring"
                                  className={classes.media}
                                  height="140"
                                  image="./tutor2.png"
                                />
                            </CardActionArea>
                            <CardActions>
                                <Button component={Link} to={'/create-profile'}>
                                    Create Profile
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            );
        }

        return (
            <React.Fragment>
                <div className="padding20">
                    <Typography variant="h4" component="h1" align="center" className="editHeading">
                        Welcome, {user.firstname}!
                    </Typography>
                    <br/>
                    {dashboardContent}
                </div>
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired    
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(withStyles(styles)(Dashboard));
