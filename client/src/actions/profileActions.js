import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, GET_PROFILES } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
}

/* TODO: Get profile by handle */
/* TODO: Create Profile */

// Get all profiles
export const listProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/all')
    .then(res => {
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_PROFILES,
            payload: null
        })
    });
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}