import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Route protected by auth, redirect when user logs out or when auth is invalid

const admin = () => {
    const { auth } = this.state;
    const isAdmin = auth.isAuthenticated === true && auth.isAdmin === true;
    return isAdmin;
}

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route 
        {...rest}
        render = {props => auth.isAuthenticated === true || admin() ? 
        <Component {...props} /> : <Redirect to="/login" />   
        }
    />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);