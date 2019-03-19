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
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditProfileImg from '../../images/edit-profile.jpg';
import DeleteAccountImg from '../../images/delete-account.jpg';
import EnableProfileImg from '../../images/enable-profile.jpg';
import DisableProfileImg from '../../images/disable-profile.jpg';
import ViewProfileImg from '../../images/view-profile.jpg';
import FindTutorImg from '../../images/find-tutor.jpg';
import BecomeTutorImg from '../../images/become-tutor.jpg';

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
     success: {
         backgroundColor: '#EEAF30'
     },
     message: {
       display: 'flex',
       alignItems: 'center',
     }
});

class Dashboard extends Component {
    state = {
      disabled: false,
      deleteDialogOpen: false,
      deleteToast: false,
    }

    componentDidMount() {
        const { profile } = this.props;
        if (Object.keys(profile).length > 0 ) this.props.getCurrentProfile();
        this.setState({ disabled: profile.disabled });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile) {
            this.setState({
                disabled: nextProps.profile.profile.disabled
            });
        }
    }

    onDeleteClick = e => {
        e.preventDefault();
        if (this.props.profile.profile.user.isAdmin) {
            this.handleDeleteToastOpen();
        }
        else {
            this.handleDeleteOpen();
        }
    }

    handleDeleteToastOpen = () => {
      this.setState({ deleteToast: true });
    };

    deleteToastClose = () => {
      this.setState({ deleteToast: false });
    };

    handleDeleteOpen = () => {
      this.setState({ deleteDialogOpen: true });
    };

    handleDeleteClose = () => {
      this.setState({ deleteDialogOpen: false });
    };

    handleDeleteSuccessClose = () => {
      this.setState({ deleteDialogOpen: false });
      this.props.deleteAccount();
    };

    onProfileSettingClick = (e, setting) => {
        e.preventDefault();
        const { profile } = this.props;
        const profileId = profile.profile._id;

        this.setState({ disabled: ((setting === 'enable') ? false : true) });

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
                    <Grid item xs={12} sm={6} md={3}>
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
                    <Grid item xs={12} sm={6} md={3}>
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
                    <Grid item xs={12} sm={6} md={3}>
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
                    {this.state.disabled ? (
                        <Grid item xs={12} sm={6} md={3}>
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
                        <Grid item xs={12} sm={6} md={3}>
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
                                  alt="become a tutor"
                                  className={classes.media}
                                  height="140"
                                  image={BecomeTutorImg}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={styles.card}>
                            <CardActionArea component={Link} to={'/profiles'}>
                                <CardMedia
                                  component="img"
                                  alt="find a tutor"
                                  className={classes.media}
                                  height="140"
                                  image={FindTutorImg}
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
                <Dialog
                  open={this.state.deleteDialogOpen}
                  onClose={this.handleDeleteClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Delete Account?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clicking Delete Account below will delete both your tutor profile and user account.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleDeleteClose} className="textPurple">
                      Cancel
                    </Button>
                    <Button onClick={this.handleDeleteSuccessClose} variant="outlined" className="purpleDelete" autoFocus>
                      Delete Account
                    </Button>
                  </DialogActions>
                </Dialog>

                <Snackbar 
                    anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                    open={this.state.deleteToast}
                    autoHideDuration={8000}
                    onClose={this.deleteToastClose}
                    >
                  <SnackbarContent
                    className={classes.success}
                    aria-describedby="client-snackbar"
                    message={
                      <span id="client-snackbar" className={classes.message}>
                        <CheckCircleIcon className="toastIcon" />
                        Admins cannot delete their accounts. Please transfer admin privileges and have that person revoke your admin status before trying again. 
                      </span>
                    }
                  />
                </Snackbar>
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
