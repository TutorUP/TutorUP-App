import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
});

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {},
        drawerOpen: false
    }

    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/profile');
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/profile');
      }

      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }
    }
    
    onSubmit = e => {
        e.preventDefault();
        
        const { email, password } = this.state;
        const upEmail = `${email}@up.edu`;
        const userData = {
            email: upEmail,
            password: password
        }
        this.props.loginUser(userData);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { errors } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.main}>
              <Paper className={classes.paper} elevation={3}>
                <Avatar className="blueAvatar">
                  <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} onSubmit={this.onSubmit}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" 
                    name="email" 
                    autoComplete="email" 
                    autoFocus 
                    onChange={this.onChange}
                    endAdornment={<InputAdornment position="end">@up.edu</InputAdornment>}
                    />
                  </FormControl>
                  <span className="error">{errors.email}</span>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password" 
                    onChange={this.onChange}/>
                  </FormControl>
                  <span className="error">{errors.password}</span>      
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="purpleSubmit"
                  >
                    Sign in
                  </Button>
                </form>
              </Paper>
              <div className="link-container">
                <Link to="/register" className="link reg-link">
                    New user? Click here to register!
                </Link>
              </div>
            </div>
          );
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login));