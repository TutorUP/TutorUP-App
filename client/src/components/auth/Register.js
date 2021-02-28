import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import isEmpty from "../../utils/is-empty";
// redux action
import { registerUser, clearErrors } from "../../redux/actions/authActions";

import SentimentSatisfiedAlt from "@material-ui/icons/SentimentSatisfiedAlt";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
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
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
});
class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    openDialog: false,
    errors: {},
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { firstname, lastname, email, password, password2 } = this.state;
    const upEmail = `${email}@up.edu`;
    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: upEmail,
      password: password,
      password2: password2,
    };

    this.props.registerUser(newUser);
    setTimeout(() => this.setState({ openDialog: true }), 1000);
  };

  componentDidMount() {
    this.props.clearErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleDialogClose = () => {
    this.setState({ openDialog: false });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes, errors } = this.props;

    return (
      <div className={classes.main}>
        <Paper className={classes.paper} elevation={3}>
          <Avatar className="blueAvatar">
            <SentimentSatisfiedAlt />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form
            className={classes.container}
            autoComplete="off"
            onSubmit={this.onSubmit}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstname">First Name</InputLabel>
              <Input
                id="firstname"
                name="firstname"
                onChange={this.onChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastname">Last Name</InputLabel>
              <Input id="lastname" name="lastname" onChange={this.onChange} />
            </FormControl>
            <span className="error">{errors.name}</span>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">UP Username</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                onChange={this.onChange}
                endAdornment={
                  <InputAdornment position="end">@up.edu</InputAdornment>
                }
              />
            </FormControl>
            <span className="error">{errors.email}</span>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                placeholder="Password needs at least 6 characters"
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onChange}
              />
              <FormHelperText id="password-helper-text">
                Must be at least 6 characters, both upper and lower case
                letters, a number, and a special character.
              </FormHelperText>
            </FormControl>
            <span className="error">{errors.password}</span>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password2">Confirm Password</InputLabel>
              <Input
                name="password2"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={this.onChange}
              />
            </FormControl>
            <span className="error">{errors.password2}</span>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="purpleSubmit"
            >
              Register
            </Button>
          </form>
        </Paper>
        <div className="link-container">
          <Link to="/login" className="link reg-link">
            Existing user? Click here to login!
          </Link>
        </div>
        {isEmpty(errors) && isEmpty(this.state.errors) ? (
          <Dialog
            open={this.state.openDialog}
            onClose={this.handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Email Confirmation Required"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Before logging in, you must confirm your email address. Check
                your email for more information.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleDialogClose}
                variant="outlined"
                component={Link}
                to="/login"
                className="purpleDelete"
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        ) : (
          <React.Fragment />
        )}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(withStyles(styles)(withRouter(Register)));
