const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    data.firstname = data.firstname.trim();
    data.lastname = data.lastname.trim();
    data.email = data.email.trim().toLowerCase();

    let errors = {};
    
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    
    if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
        errors.firstname = 'Name must be between 2 and 30 characters';
    }

    if (!Validator.isLength(data.lastname, { min: 1, max: 30 })) {
        errors.lastname = 'Name must be between 1 and 30 characters';
    }
    
    if (Validator.isEmpty(data.firstname)) {
        errors.name = 'Firstname field is required';
    }

    if (Validator.isEmpty(data.lastname)) {
        errors.name = 'Lastname field is required';
    }
    
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    
    function hasNumber(password) {
        if(/\d/.test(password)){
            return "true";
        }
        else{
            return "false";
        }
      }

    function hasMixed(password) {
       if(/[a-z]/.test(password) && /[A-Z]/.test(password)){
           return "true";
       }
       else{
           return "false";
       }
    }

    function hasSpecial(password) {
        if(/[!#@$%^&*)(+=._-]/.test(password)){
            return "true";
        }
        else{
            return "false";
        }
    }

    handlePassword = e => {
    this.setState({ [e.target.name]: e.target.value })
    }
  
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if(!Validator.equals( "true", hasNumber(data.password))){
        errors.password = 'Password must have at least one number.';
    }

    if(!Validator.equals( "true", hasMixed(data.password))){
        errors.password = 'Password must have both Upper and Lower Cased letters.';
    }

    if(!Validator.equals( "true", hasSpecial(data.password))){
        errors.password = 'Password must have at least one special character.';
    }
    
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }
    
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
}