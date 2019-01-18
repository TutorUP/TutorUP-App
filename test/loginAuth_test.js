const chai = require('chai');
const expect = chai.expect;
const validateLoginInput = require('../validation/LoginAuth');

describe('Login with valid input', () => {
    it('Should login properly', done => {
        const LoginData = {
            email: 'miles@up.edu',
            password: 'miles1234',
        }

        const { errors, isValid } = validateLoginInput(LoginData);
        expect(isValid).to.be.true;
        expect(errors).to.deep.equal({});
        done();
    });
});

describe('Login with invalid email (non email)', () => {
    it('Should return error', done => {
        const LoginData = {
            email: 'miles',
            password: 'miles1234',
        }

        const { errors, isValid } = validateLoginInput(LoginData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({email: "Email is invalid"});
        done();
    });
});

describe('Login with invalid password (empty password)', () => {
    it('Should return error', done => {
        const LoginData = {
            email: 'miles@up.edu',
            password: '',
            password2: ''
        }

        const { errors, isValid } = validateLoginInput(LoginData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({
            password: "Password must be at least 6 characters"
        });
        done();
    });
});

describe('Login with invalid password (non-proper length)', () => {
    it('Should return error', done => {
        const LoginData = {
            email: 'miles@up.edu',
            password: 'miles',
            password2: 'miles'
        }

        const { errors, isValid } = validateLoginInput(LoginData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({password: "Password must be at least 6 characters"});
        done();
    });
});

describe('Login with empty form', () => {
    it('Should return error', done => {
        const LoginData = {
            email: '',
            password: '',
        }

        const { errors, isValid } = validateLoginInput(LoginData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({
            email: "Email field is required",
            password: "Password must be at least 6 characters",
        });
        done();
    });
});

