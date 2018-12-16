import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import withStyles from '@material-ui/core/styles/withStyles';

import CssBaseline from '@material-ui/core/CssBaseline';

// components
import AppNavbar from './components/layout/AppNavbar';
import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <AppNavbar />
        <Login />
     

      </div>
    );
  }
}

export default App;
