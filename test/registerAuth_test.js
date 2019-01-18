const chai = require('chai');
const expect = chai.expect;
const validateRegisterInput = require('../validation/registerAuth');

describe('Register with valid input', () => {
    it('Should register properly', done => {
        const registerData = {
            name: 'Miles Morales',
            email: 'miles@up.edu',
            password: 'miles1234',
            password2: 'miles1234'
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.true;
        expect(errors).to.deep.equal({});
        done();
    });
});

describe('Register with invalid password2 (non matching)', () => {
    it('Should return error', done => {
        const registerData = {
            name: 'Miles Morales',
            email: 'miles@up.edu',
            password: 'miles1234',
            password2: 'miles124'
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({password2: "Passwords must match"});
        done();
    });
});

describe('Register with invalid password (empty passwords)', () => {
    it('Should return error', done => {
        const registerData = {
            name: 'Miles Morales',
            email: 'miles@up.edu',
            password: '',
            password2: ''
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({
            password: "Password must be at least 6 characters",
            password2: "Confirm Password field is required"
        });
        done();
    });
});

describe('Register with invalid password (non matching password2)', () => {
    it('Should return error', done => {
        const registerData = {
            name: 'Miles Morales',
            email: 'miles@up.edu',
            password: 'miles1242',
            password2: 'miles124'
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({password2: "Passwords must match"});
        done();
    });
});

describe('Register with invalid password (non-proper length)', () => {
    it('Should return error', done => {
        const registerData = {
            name: 'Miles Morales',
            email: 'miles@up.edu',
            password: 'miles',
            password2: 'miles'
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({password: "Password must be at least 6 characters"});
        done();
    });
});

describe('Register with empty form', () => {
    it('Should return error', done => {
        const registerData = {
            name: '',
            email: '',
            password: '',
            password2: ''
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({
            name: "Name field is required",
            email: "Email is invalid",
            password: "Password must be at least 6 characters",
            password2: "Confirm Password field is required"
        });
        done();
    });
});

