import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Redux related
import { Provider } from 'react-redux';
import store from './redux/store';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import { clearCurrentProfile } from './redux/actions/profileActions';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';

// components
import PrivateRoute from './components/common/PrivateRoute';
import AppNavbar from './components/layout/AppNavbar';
import AppFooter from './components/layout/AppFooter';
import AppLanding from './components/layout/AppLanding';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';

// containers
import ProfileShowcase from './components/showcase/ProfileShowcase';
import { checkAuth } from './utils/authPersist';

import AddAvailability from './components/profileOptions/AddAvailability';
import Profile from './components/profile/Profile';

import AppSearch from './components/search/AppSearch';


// Check for JWT for persistence
if (localStorage.jwtToken) {
  const decoded = checkAuth();
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());  
    // Redirect to login
    window.location.href = '/login';
  }
}

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  appBarSpacer: theme.mixins.toolbar,
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
        <Provider store={ store }>
          <Router>
            <div className="App">
              <CssBaseline />
              <AppNavbar />
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Route exact path="/" component={AppLanding} />
                <Route exact path="/search" component={AppSearch} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/myprofile" component={Profile} />
                <Route exact path="/profiles" component={ProfileShowcase} />
                
                {/* For Routes protected by Auth */}
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-availability" component={AddAvailability}/>
                </Switch>
              </main>
              <AppFooter />
            </div>
          </Router>
        </Provider>
    );
  }
}

export default withStyles(styles)(App);
