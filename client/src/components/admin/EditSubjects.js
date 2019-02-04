import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { createProfile, getCurrentProfile } from '../../redux/actions/profileActions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

class EditSubjects extends Component {
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

 addSubject = (e) => {
    this.setState((prevState) => ({
      subjects: [...prevState.subjects, {id: "", name: "", isMajor: "", isMinor: ""}],
    }));
 }

 removeSubject = (i) => {
   // remove subject
 }

 onSubmit = e => {
     e.preventDefault();
     this.props.createSubjects(this.state.subjects, this.props.history);
 }

 onChange = e => {
   const name = e.target.name;
   let subjects = [...this.state.subjects];
   let i = name.charAt(name.length - 1);
   let property = name.substring(0, name.length - 2);

   subjects[i][property] = e.target.value;
   this.setState({ [subjects]: subjects });
 }

// on cancel go back to dashboard to eliminate need for extra button
render() {
    const { classes } = this.props;

    const subjectItems = this.state.subjects.map((subject, i) => {
            let id = "id-" + i;
            let name = "name-" + i;
            let isMajor = "isMajor-" + i;
            let isMinor = "isMinor-" + i; 

            return  (
              <Grid item xs={12} key={i}>
               <Card className="card" elevation={0}>
                  <CardContent>
                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={3}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor={id}>Subject ID</InputLabel>
                            <Input type="text" id={id} name={id} value={subject.id} fullWidth onChange={this.onChange}>
                            </Input>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor={name}>Subject Name</InputLabel>
                            <Input type="text" id={name} name={name} value={subject.name} fullWidth onChange={this.onChange}>
                            </Input>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                          <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor={isMajor}>Is Major?</InputLabel>
                            <Select value={subject.isMajor} onChange={this.onChange} variant="outlined" name={isMajor} id={isMajor}>
                                <MenuItem value=""></MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                          <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor={isMinor}>Is Minor?</InputLabel>
                            <Select value={subject.isMinor} onChange={this.onChange} variant="outlined" name={isMinor} id={isMinor}>
                                <MenuItem value=""></MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={this.removeSubject(i)}>Remove Subject</Button>
                  </CardActions>
                </Card>
             </Grid> 
           )});  

    return (
      <div className="padding20">
            <Typography variant="h4" component="h1" align="center" className="editHeading">
                Create and Edit Subjects
            </Typography>
            <Grid container justify="space-between" spacing={24}>
               <Grid item xs={12}>
                   <div className="courses"></div>
               </Grid>
               <Grid item>
                   <Button aria-label="Add Subject" variant="outlined" onClick={this.addSubject}>
                      Add a Subject 
                   </Button>
                   
               </Grid>
               {subjectItems}
            </Grid>  
      </div>
    );
  }
}

EditSubjects.propTypes = {
    errors: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired    
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(withStyles(styles)(EditSubjects)));
