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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { sortArrByAscending, removeByMatch } from '../../utils/lodashOps';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#5E9CAE',
    color: '#fff',
    fontWeight: 'bold'
  }
}))(TableCell);

const styles = theme => ({
     success: {
        backgroundColor: '#EEAF30',
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
     deleteDialogOpen: false,
     deleteName: '',
     deleteUserId: '',
     errors: {}
 }

 componentDidMount() {
     this.props.getAllProfilesByAdmin();
 }

 componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.profiles) {
        this.setState({
            profiles: sortArrByAscending(nextProps.profiles, ['firstname', 'lastname'])
        });
    }
  }

  handleAdminClose = () => {
    this.setState({ adminToastOpen: false });
  };

  handleEnableClose = () => {
    this.setState({ enableToastOpen: false });
  };

  handleDeleteOpen = () => {
    this.setState({ deleteDialogOpen: true });
  };

  handleDeleteClose = () => {
    this.setState({ 
        deleteDialogOpen: false,
        deleteName: '',
        deleteUserId: ''
    });
  };

  handleDeleteSuccessClose = () => {
    this.setState({ 
        deleteDialogOpen: false,
        deleteName: '',
        deleteUserId: ''
    });

    let profiles = [...this.state.profiles];
    const newProfiles = profiles.filter(user => {
        return user._id !== this.state.deleteUserId
    });

    this.setState({
        profiles: [...newProfiles]
    });

     const id = {
         user: this.state.deleteUserId,
     }
     this.props.deleteAccountByAdmin(id);
  };

 deleteUser = (e, userID) => {
    e.preventDefault();
    let profiles = [...this.state.profiles];
    let updatedUser = removeByMatch(profiles, function(user) { return user._id === userID; });
    let userName = updatedUser[0].firstname + " " + updatedUser[0].lastname;

    this.setState({
        deleteUserId: userID,
        deleteName: userName,
    }, () => this.handleDeleteOpen());
 }

 setAdmin = (e, userID, value) => {
     // update the state with the new variable 
     let profiles = [...this.state.profiles];
     let updatedUser = removeByMatch(profiles, function(user) { return user._id === userID; });
     updatedUser[0].isAdmin = value;

     let msgType = value ? "added" : "removed";
     let msg = `Admin privileges ${msgType} for ${updatedUser[0].firstname} ${updatedUser[0].lastname}.`;

     this.setState({
         profiles: sortArrByAscending(_.concat(profiles, updatedUser), ['firstname', 'lastname']),
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

 selectDisable = (e, userId, setting) => {
     e.preventDefault();
    if (setting === 'enable') this.props.enableProfileByUser(userId);
    else if (setting === 'disable') this.props.disableProfileByUser(userId);

    let profiles = [...this.state.profiles];
    let updatedUser = removeByMatch(profiles, function(user) { return user._id === userId; });
    updatedUser[0].disabled = (setting === 'enable') ? false : true;

    let msgType = (setting === 'enable') ? "enabled" : "disabled";
    let msg = `${updatedUser[0].firstname} ${updatedUser[0].lastname}'s profile has been ${msgType}.`;

    this.setState({
         profiles: sortArrByAscending(_.concat(profiles, updatedUser), ['firstname', 'lastname']),
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
                  <CustomTableCell className="emailCol">User Email</CustomTableCell>
                  <CustomTableCell></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profiles.map(user => (
                  <TableRow key={user._id} hover={true}>
                    <TableCell component="th" scope="row">
                      {user.firstname} {user.lastname} 
                      {user.isAdmin && <span> (admin)</span>}
                    </TableCell>
                    <TableCell className="emailCol">{user.email}</TableCell>
                    <TableCell align="right">
                        {user.isAdmin &&
                        <Tooltip title="Remove Admin">
                            <span><IconButton disabled={user._id === auth.user.id}
                                onClick={((e) => this.setAdmin(e, user._id, false))}>
                                <AddAdminIcon />
                            </IconButton></span>
                        </Tooltip>}
                        {!user.isAdmin &&
                        <Tooltip title="Make Admin">
                            <IconButton onClick={((e) => this.setAdmin(e, user._id, true))}>
                                <RemoveAdminIcon />
                            </IconButton>
                        </Tooltip>}
                        {user.disabled ? (
                                <Tooltip title={user.hasProfile ? "Enable Profile" : "No Profile"}>
                                    <span><IconButton disabled={!user.hasProfile} onClick={((e) => this.selectDisable(e, user._id, 'enable'))}>
                                        <DisabledIcon />
                                    </IconButton></span>
                                </Tooltip>
                            ) : (
                                <Tooltip title={user.hasProfile ? "Disable Profile" : "No Profile"}>
                                    <span><IconButton disabled={!user.hasProfile} onClick={((e) => this.selectDisable(e, user._id, 'disable'))}>
                                        <VisibleIcon />
                                    </IconButton></span>
                                </Tooltip>
                            )
                        }
                        <Tooltip title={user.isAdmin ? "Cannot Delete Admin" : "Delete User Account"}>
                            <span><IconButton disabled={user.isAdmin}
                                onClick={((e) => this.deleteUser(e, user._id))}>
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
                autoHideDuration={4000}
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
                autoHideDuration={4000}
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

            <Dialog
              open={this.state.deleteDialogOpen}
              onClose={this.handleDeleteClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Delete Account for " + this.state.deleteName + "?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Clicking Delete Account below will delete both their tutor profile and user account.
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
