const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSubjectInput(data) {
    let errors = {};

    data.id = !isEmpty(data.id) ? data.id : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.isMajor = !isEmpty(data.isMajor) ? data.isMajor : '';
    data.isMinor = !isEmpty(data.isMinor) ? data.isMinor : '';


    if (!Validator.isLength(data.name, {max: 50})) {
        errors.name = 'Course name cannot be more than 50 characters';
    }

    if (!Validator.isLength(data.id, {max: 5})) {
        errors.name = 'Course ID cannot be more than 5 characters';
    }

    if (Validator.isEmpty(data.id)) {
        errors.id = 'Subject ID is required.';
    }

    if (Validator.isEmpty(data.isMajor)) {
        errors.isMajor = 'Subject isMajor field is required';
    }

    if (Validator.isEmpty(data.isMinor)) {
        errors.isMinor = 'Subject isMinor field is required';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Subject name field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}