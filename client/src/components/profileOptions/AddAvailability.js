import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAvailability } from '../../redux/actions/profileActions';

// MUI imports
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from 'material-ui-pickers';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

class AddAvailability extends Component {
    state = {
        department: '',
        courseNum: '',
        availableTime: new Date(),
        errors: '',
    }

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onSubmit = e => {
        e.preventDefault();

        let { department, courseNum, availableTime } = this.state;

        // parse Moment as unix timestamps
        availableTime = availableTime.unix();

        const availabilityData = {
            department,
            courseNum,
            availableTime
        }

        this.props.addAvailability(availabilityData, this.props.history);

    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleDateChange = date => {
        this.setState({ availableTime : date });
    }

    render() {
        const { department, courseNum, availableTime, errors } = this.state;
        
        return (
            <Card>
                <Link to="/dashboard">Go Back</Link>
                <Typography variant="h2" gutterBottom>Add Availability</Typography>
                <Typography variant="subtitle1" gutterBottom>Select what time you can meet up with a tutor/tutee</Typography>
                <form onSubmit={this.onSubmit}>
                    <Grid container spacing={100}>
                        <Grid item xs={12} md={6}>
                            <FormControl required>
                                <InputLabel htmlFor="department">
                                Select a Department
                                </InputLabel>
                                <Input id="department" name="department" onChange={this.onChange} value={department}>
                                </Input>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <FormControl required>
                            <InputLabel htmlFor="coursenum">
                            Enter a Course Number
                            </InputLabel>
                            <Input id="courseNum" name="courseNum" onChange={this.onChange} value={courseNum}>
                            </Input>
                        </FormControl>
                        </Grid>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DateTimePicker 
                                    disablePast
                                    minDate={Date.now()}
                                    showTodayButton
                                    keyboard 
                                    label="Available Date" 
                                    value={availableTime} 
                                    onChange={this.handleDateChange} 
                                />
                            </MuiPickersUtilsProvider>
                        {errors}
                        <Button type="submit" variant="outlined" color="inherit">Submit</Button>
                    </Grid>
                </form>

            </Card>

        );
    }
}

AddAvailability.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addAvailability: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
});

export default connect(mapStateToProps, { addAvailability })(withRouter(AddAvailability));