import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import withStyles from '@material-ui/core/styles/withStyles';

import CssBaseline from '@material-ui/core/CssBaseline';

// components
import AppNavbar from './components/layout/AppNavbar';
import AppFooter from './components/layout/AppFooter';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProgressSpinner from './components/common/ProgressSpinner';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <CssBaseline />
            <AppNavbar />
            <div className="container">
              <Register />
              <Login />
            </div>
            
            <AppFooter />
          </div>
        </Router>
    );
  }
}

export default App;
