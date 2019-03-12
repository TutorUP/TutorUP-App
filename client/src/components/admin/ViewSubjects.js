import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getSubjects } from '../../redux/actions/subjectActions';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
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

class ViewSubjects extends Component {
 state = {
     subjects: [],
     errors: {}
 }

 componentDidMount() {
     this.props.getSubjects();
 }

 componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.subjects.subjects) {
        this.setState({
            subjects: _.sortBy(nextProps.subjects.subjects, ['name'])
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
                  <CustomTableCell>Subject Name</CustomTableCell>
                  <CustomTableCell>Is Major?</CustomTableCell>
                  <CustomTableCell>Is Minor?</CustomTableCell>
                  <CustomTableCell>Is Course?</CustomTableCell>
                  <CustomTableCell>Course ID</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.subjects.map(subject => (
                  <TableRow key={subject.name} hover={true}>
                    <TableCell component="th" scope="row">
                      {subject.name}
                    </TableCell>
                    <TableCell>{subject.isMajor}</TableCell>
                    <TableCell>{subject.isMinor}</TableCell>
                    <TableCell>{subject.isCourse}</TableCell>
                    <TableCell>{subject.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      </div>
    );
  }
}

ViewSubjects.propTypes = {
    getSubjects: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired    
}

const mapStateToProps = state => ({
    errors: state.errors,
    subjects: state.subjects
});

export default connect(mapStateToProps, { getSubjects })(withRouter(withStyles(styles)(ViewSubjects)));
