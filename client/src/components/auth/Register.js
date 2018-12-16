import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
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

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const { email, password } = this.state;
        const userData = {
            email: email,
            password: password
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { errors } = this.state;
        const { classes } = this.props;
        return (
            <main className={classes.main}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <SentimentSatisfiedAlt />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
                <form className={classes.form} onSubmit={this.onSubmit}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="name" name="name" autoComplete="email" autoFocus />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" name="email" autoComplete="email" autoFocus />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password" />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                    <Input name="password2" type="password" id="password2" autoComplete="current-password" />
                  </FormControl>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
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
            </main>
          );
    }

}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(Register);