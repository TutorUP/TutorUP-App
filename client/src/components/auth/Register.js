import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { string, object } from 'yup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// redux action
import { registerUser } from '../../redux/actions/authActions';

import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

// Validation with Yup
const validationSchema = object({
  name: string("Name")
})

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }

    onSubmit = e => {
        e.preventDefault();
        
        const { name, email, password, password2 } = this.state;
        const newUser = {
            name: name,
            email: email,
            password: password,
            password2: password2
        }

        this.props.registerUser(newUser, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { classes, errors } = this.props;

        return (
            <div className={classes.main}>
              <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                  <SentimentSatisfiedAlt />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
                <form className={classes.container} autoComplete="off" onSubmit={this.onSubmit}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="name" name="name" autoComplete="email" autoFocus onChange={this.onChange}/>
                  </FormControl>
                  {errors.name}
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.onChange}/>
                  </FormControl>
                  {errors.email}
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.onChange}/>
                  </FormControl>
                  {errors.password}
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                    <Input name="password2" type="password" id="password2" autoComplete="current-password" onChange={this.onChange}/>
                  </FormControl>
                  {errors.password2}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Register
                  </Button>
                </form>
              </Paper>
            </div>
          );
    }

}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withStyles(styles)(withRouter(Register)));