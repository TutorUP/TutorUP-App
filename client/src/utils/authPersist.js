import axios from 'axios';
import jwt_decode from 'jwt-decode';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const checkAuth = () => {
    // Check for token
    if (localStorage.jwtToken) {
        // Set auth token
        setAuthToken(localStorage.jwtToken);

        // Decode token and get user info
        const decoded = jwt_decode(localStorage.jwtToken);
        return decoded;
    }
} 