const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCourseInput(data) {
    let errors = {};

    data.id = !isEmpty(data.id) ? data.id : '';
    data.number = !isEmpty(data.number) ? data.number : '';
    data.name = !isEmpty(data.name) ? data.name : '';

    if (!Validator.isLength(data.number, 3)) {
        errors.number = 'Course number must be 3 digits';
    }

    if (Validator.isEmpty(data.id)) {
        errors.id = 'Course ID is required.';
    }

    if (Validator.isEmpty(data.number)) {
        errors.number = 'Course number is required';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}