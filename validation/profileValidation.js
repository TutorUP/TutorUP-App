const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.type = !isEmpty(data.type) ? data.type : '';
    data.bio = !isEmpty(data.bio) ? data.bio : '';
    data.availability = !isEmpty(data.availability) ? data.availability : '';

    if (Validator.isEmpty(data.type)) {
        errors.type = 'Type (paid or volunteer) is required.';
    }

    if (Validator.isEmpty(data.bio)) {
        errors.type = 'Bio field is required.';
    }

    if (Validator.isEmpty(data.availability)) {
        errors.type = 'Availability field is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}