import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deleteAccountByAdmin, disableProfileByUser, enableProfileByUser, getAllProfilesByAdmin } from '../../redux/actions/profileActions';
import { setAdmin } from '../../redux/actions/authActions';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddAdminIcon from '@material-ui/icons/PersonAdd';
import RemoveAdminIcon from '@material-ui/icons/PersonAddDisabled';
import DisabledIcon from '@material-ui/icons/VisibilityOff';
import VisibleIcon from '@material-ui/icons/Visibility';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#5E9CAE',
    color: '#fff',
    fontWeight: 'bold'
  }
}))(TableCell);

const styles = theme => ({
     success: {
        backgroundColor: '#1E1656',
     },
     message: {
       display: 'flex',
       alignItems: 'center',
     },
});

class Users extends Component {
 state = {
     profiles: [],
     profilesToDisable: [],
     adminToastOpen: false,
     adminToastMsg: '',
     enableToastOpen: false,
     enableToastMsg: '',
     errors: {}
 }

 componentDidMount() {
     this.props.getAllProfilesByAdmin();
}

 componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.profiles) {
        this.setState({
            profiles: _.sortBy(nextProps.profiles, ['user.firstname', 'user.lastname'])
        });
    }
 }

  handleAdminClose = () => {
    this.setState({ adminToastOpen: false });
  };

  handleEnableClose = () => {
    this.setState({ enableToastOpen: false });
  };

 deleteUser = (e, profileID, userID) => {
    e.preventDefault();
    let profiles = [...this.state.profiles];
    const newProfiles = profiles.filter(profile => {
        return profile._id !== profileID
    });

    this.setState({
        profiles: [...newProfiles]
    });

     const id = {
         user: userID,
         profile: profileID
     }
     this.props.deleteAccountByAdmin(id);
 }

 setAdmin = (e, userID, value) => {
     // update the state with the new variable 
     let profiles = [...this.state.profiles];
     let updatedProfile = _.remove(profiles, function(profile) { return profile.user._id === userID; });
     updatedProfile[0].user.isAdmin = value;

     let msgType = value ? "added" : "removed";
     let msg = `Admin privileges ${msgType} for ${updatedProfile[0].user.firstname} ${updatedProfile[0].user.lastname}.`;

     this.setState({
         profiles: _.sortBy(_.concat(profiles, updatedProfile), ['user.firstname', 'user.lastname']),
         adminToastOpen: true,
         adminToastMsg: msg
     });

     // create object to send to backend 
     const data = {
         id: userID,
         isAdmin: value
     }
     this.props.setAdmin(data);
 }

 selectDisable = (e, profileId, setting) => {
     e.preventDefault();
    if (setting === 'enable') this.props.enableProfileByUser(profileId);
    else if (setting === 'disable') this.props.disableProfileByUser(profileId);

    let profiles = [...this.state.profiles];
    let updatedProfile = _.remove(profiles, function(profile) { return profile._id === profileId; });
    updatedProfile[0].disabled = (setting === 'enable') ? false : true;

    let msgType = (setting === 'enable') ? "enabled" : "disabled";
    let msg = `${updatedProfile[0].user.firstname} ${updatedProfile[0].user.lastname}'s profile has been ${msgType}.`;

    this.setState({
         profiles: _.sortBy(_.concat(profiles, updatedProfile), ['user.firstname', 'user.lastname']),
         enableToastOpen: true,
         enableToastMsg: msg
     });
 }



render() {
    const { classes, auth } = this.props;
    const { profiles } = this.state

    return (
      <div className="padding20">
            <Typography variant="h4" component="h1" align="center" className="editHeading">
                Manage Profiles
            </Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>User Name</CustomTableCell>
                  <CustomTableCell>User Email</CustomTableCell>
                  <CustomTableCell></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profiles.map(profile => (
                  <TableRow key={profile._id} hover={true}>
                    <TableCell component="th" scope="row">
                      {profile.user.firstname} {profile.user.lastname} 
                      {profile.user.isAdmin && <span> (admin)</span>}
                    </TableCell>
                    <TableCell>{profile.user.email}</TableCell>
                    <TableCell align="right">
                        {profile.user.isAdmin &&
                        <Tooltip title="Remove Admin">
                            <span><IconButton disabled={profile.user._id === auth.user.id}
                                onClick={((e) => this.setAdmin(e, profile.user._id, false))}>
                                <RemoveAdminIcon />
                            </IconButton></span>
                        </Tooltip>}
                        {!profile.user.isAdmin &&
                        <Tooltip title="Make Admin">
                            <IconButton onClick={((e) => this.setAdmin(e, profile.user._id, true))}>
                                <AddAdminIcon />
                            </IconButton>
                        </Tooltip>}
                        {profile.disabled ? (
                                <Tooltip title="Enable Profile">
                                    <IconButton onClick={((e) => this.selectDisable(e, profile._id, 'enable'))}>
                                        <VisibleIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Disable Profile">
                                    <IconButton onClick={((e) => this.selectDisable(e, profile._id, 'disable'))}>
                                        <DisabledIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        <Tooltip title="Delete User Account">
                            <span><IconButton disabled={profile.user.isAdmin}
                                onClick={((e) => this.deleteUser(e, profile._id, profile.user._id))}>
                                <DeleteIcon />
                            </IconButton></span>
                        </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>

            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                open={this.state.adminToastOpen}
                autoHideDuration={5000}
                onClose={this.handleAdminClose}
                >
              <SnackbarContent
                className={classes.success}
                aria-describedby="client-snackbar"
                message={
                  <span id="client-snackbar" className={classes.message}>
                    <CheckCircleIcon className="toastIcon" />
                    {this.state.adminToastMsg}
                  </span>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.handleAdminClose}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>,
                ]}
              />
            </Snackbar>

            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                open={this.state.enableToastOpen}
                autoHideDuration={5000}
                onClose={this.handleEnableClose}
                >
              <SnackbarContent
                className={classes.success}
                aria-describedby="client-snackbar"
                message={
                  <span id="client-snackbar" className={classes.message}>
                    <CheckCircleIcon className="toastIcon" />
                    {this.state.enableToastMsg}
                  </span>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.handleEnableClose}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>,
                ]}
              />
            </Snackbar>
      </div>
    );
  }
}

Users.propTypes = {
    getAllProfilesByAdmin: PropTypes.func.isRequired,
    deleteAccountByAdmin: PropTypes.func.isRequired,
    setAdmin: PropTypes.func.isRequired,
    disableProfileByUser: PropTypes.func.isRequired,
    enableProfileByUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profiles: state.profile.profiles,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { getAllProfilesByAdmin, deleteAccountByAdmin, setAdmin, disableProfileByUser, enableProfileByUser })(withRouter(withStyles(styles)(Users)));
