import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { createProfile, getCurrentProfile } from '../../redux/actions/profileActions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

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

class ViewSubjects extends Component {
 state = {
     subjects: []
 }

 componentDidMount() {
     // this.props.getAllSubjects();
     this.setState(this.state);
 }

 componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.subjects) {
        this.setState({
            subjects: nextProps.subjects
        });
    }
 }

// on cancel go back to dashboard to eliminate need for extra button
render() {
    const { classes } = this.props;

    return (
      <div className="padding20">
            <Typography variant="h4" component="h1" align="center" className="editHeading">
                View Subjects
            </Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Subject ID</CustomTableCell>
                  <CustomTableCell>Subject Name</CustomTableCell>
                  <CustomTableCell>Is Major?</CustomTableCell>
                  <CustomTableCell>Is Minor?</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.subjects.map(subject => (
                  <TableRow key={subject.id} hover={true}>
                    <TableCell component="th" scope="row">
                      {subject.id}
                    </TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.isMajor}</TableCell>
                    <TableCell>{subject.isMinor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      </div>
    );
  }
}

ViewSubjects.propTypes = {
    errors: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired    
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(withStyles(styles)(ViewSubjects)));
