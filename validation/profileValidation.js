const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.major = !isEmpty(data.major) ? data.major : '';
    data.status = !isEmpty(data.status) ? data.status : '';

    if (!Validator.isLength(data.major, { min: 2, max: 40 })) {
        errors.major = 'Major needs to be betweeen 2 and 4 characters';
    }

    if (Validator.isEmpty(data.major)) {
        errors.major = 'Profile major is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}