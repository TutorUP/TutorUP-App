import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressSpinner from '../common/ProgressSpinner';

import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, disableProfileByUser, enableProfileByUser } from '../../redux/actions/profileActions';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import EditProfileImg from '../../images/edit-profile.jpg';
import CreateProfileImg from '../../images/create-profile.jpg';
import DeleteAccountImg from '../../images/delete-account.jpg';
import EnableProfileImg from '../../images/enable-profile.jpg';
import DisableProfileImg from '../../images/disable-profile.jpg';
import ViewProfileImg from '../../images/view-profile.jpg';

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
        e.preventDefault();
        this.props.deleteAccount();
    }

    onProfileSettingClick = (e, setting) => {
        e.preventDefault();
        const { profile } = this.props;
        const profileId = profile.profile._id;

        if (setting === 'enable') this.props.enableProfileByUser(profileId, this.props.history);
        else if (setting === 'disable') this.props.disableProfileByUser(profileId, this.props.history);
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
                            <CardActionArea component={Link} to={'/edit-profile'}>
                                <CardMedia
                                  component="img"
                                  alt="edit profile"
                                  className={classes.media}
                                  height="140"
                                  image={EditProfileImg}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={styles.card}>
                            <CardActionArea component={Link} to={`/profile/${profile.handle}`}>
                                <CardMedia
                                  component="img"
                                  alt="view profile"
                                  className={classes.media}
                                  height="140"
                                  image={ViewProfileImg}
                                />
                            </CardActionArea>
                          </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={styles.card}>
                            <CardActionArea onClick={this.onDeleteClick}>
                                <CardMedia
                                  component="img"
                                  alt="delete account"
                                  className={classes.media}
                                  height="140"
                                  image={DeleteAccountImg}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    {/* show this if profile is dis/en -abled */}
                    {profile.disabled ? (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={styles.card}>
                                <CardActionArea onClick={e => this.onProfileSettingClick(e, 'enable')}>
                                    <CardMedia
                                    component="img"
                                    alt="enable account"
                                    className={classes.media}
                                    height="140"
                                    image={EnableProfileImg}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ) : (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={styles.card}>
                                <CardActionArea onClick={e => this.onProfileSettingClick(e, 'disable')}>
                                    <CardMedia
                                        component="img"
                                        alt="disable account"
                                        className={classes.media}
                                        height="140"
                                        image={DisableProfileImg}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        )
                    }
                </Grid>
            ) : (
                <Grid container spacing={24} justify="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={styles.card}>
                            <CardActionArea component={Link} to={'/create-profile'}>
                                <CardMedia
                                  component="img"
                                  alt="create profile"
                                  className={classes.media}
                                  height="140"
                                  image={CreateProfileImg}
                                />
                            </CardActionArea>
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

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, disableProfileByUser, enableProfileByUser })(withStyles(styles)(Dashboard));
