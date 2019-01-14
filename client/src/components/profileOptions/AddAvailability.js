import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAvailability } from '../../redux/actions/profileActions';

// MUI imports
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from 'material-ui-pickers';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddAvailability extends Component {
    state = {
        subject: '',
        from: new Date(),
        to: new Date(),
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

        let { subject, from, to } = this.state;

        // parse Moments as unix timestamps
        from = from.unix();
        to = to.unix();

        const availabilityData = {
            subject,
            from,
            to
        }

        console.log(availabilityData)

        // this.props.addAvailability(availabilityData, this.props.history);

    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleFromDateChange = date => {
        this.setState({ from : date });
    }

    handleToDateChange = date => {
        this.setState({ to: date });
    }

    render() {
        const { from, to, errors } = this.state;
        

        return (
            <div>
                <Link to="/dashboard">Go Back</Link>
                <Typography variant="h2" gutterBottom>Add Availability</Typography>
                <Typography variant="p" gutterBottom>Select what time you can meet up with a tutor/tutee</Typography>
                <form onSubmit={this.onSubmit}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DateTimePicker 
                        disablePast
                        minDate={Date.now()} 
                        maxDate={to} 
                        showTodayButton
                        keyboard 
                        label="From Date" 
                        value={from} 
                        onChange={this.handleFromDateChange} 
                    />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DateTimePicker minDate={from} keyboard label="To Date" value={to} onChange={this.handleToDateChange} />
                    </MuiPickersUtilsProvider>
                    {errors}
                    <Button type="submit" variant="outlined" color="inherit">Submit</Button>
                </form>

            </div>
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