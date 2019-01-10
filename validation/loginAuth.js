const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 8, max: 50})) {
        errors.password = 'Password needs to be at least 10 characters';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
}