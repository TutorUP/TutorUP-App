import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProfiles, deleteAccountByAdmin } from '../../redux/actions/profileActions';
import { setAdmin } from '../../redux/actions/authActions';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from '@material-ui/icons/Delete';
import AddAdminIcon from '@material-ui/icons/PersonAdd';
import RemoveAdminIcon from '@material-ui/icons/PersonAddDisabled';
import TableRow from '@material-ui/core/TableRow';
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
     head: {
         backgroundColor: '#1E1656',
         color: '#fff',
         fontWeight: 'bold',
         fontSize: 16
     }
});

class Users extends Component {
 state = {
     profiles: [],
     errors: {}
 }

 componentDidMount() {
     this.props.getProfiles();
}

 componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.profiles) {
        this.setState({
            profiles: _.sortBy(nextProps.profiles, ['user.firstname', 'user.lastname'])
        });
    }
 }

 deleteUser = (e, profileID, userID) => {
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

     this.setState({
         profiles: _.sortBy(_.concat(profiles, updatedProfile), ['user.firstname', 'user.lastname'])
     });

     // create object to send to backend 
     const data = {
         id: userID,
         isAdmin: value
     }
     this.props.setAdmin(data);
 }

 selectDisable = (e) => {
     console.log(e.target.value)
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
                    <CustomTableCell>Disable</CustomTableCell>
                  <CustomTableCell>User Name</CustomTableCell>
                  <CustomTableCell>User Email</CustomTableCell>
                  <CustomTableCell></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profiles.map(profile => (
                  <TableRow key={profile._id} hover={true}>
                    <Checkbox checked />
                    <TableCell component="th" scope="row">
                      {profile.user.firstname} {profile.user.lastname} 
                      {profile.user.isAdmin && <span> (admin)</span>}
                    </TableCell>
                    <TableCell>{profile.user.email}</TableCell>
                    <TableCell align="right">
                        {profile.user.isAdmin &&
                        <IconButton disabled={profile.user._id === auth.user.id}
                            onClick={((e) => this.setAdmin(e, profile.user._id, false))}>
                            <RemoveAdminIcon />
                        </IconButton>}
                        {!profile.user.isAdmin &&
                        <IconButton onClick={((e) => this.setAdmin(e, profile.user._id, true))}>
                            <AddAdminIcon />
                        </IconButton>}
                        <IconButton disabled={profile.user.isAdmin}
                            onClick={((e) => this.deleteUser(e, profile._id, profile.user._id))}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
      </div>
    );
  }
}

Users.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    deleteAccountByAdmin: PropTypes.func.isRequired,
    setAdmin: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profiles: state.profile.profiles,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { getProfiles, deleteAccountByAdmin, setAdmin })(withRouter(withStyles(styles)(Users)));
