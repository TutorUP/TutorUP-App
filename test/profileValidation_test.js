const chai = require('chai');
const expect = chai.expect;
const validateProfileInput = require('../validation/profileValidation');

describe('Profile with valid input', () => {
    it('Should Profile properly', done => {
        const ProfileData = {
            major: 'Computer Science',
            status: 'Sophomore',
            classes: 'CS343, HST123, CS203, THEO101'
        }

        const { errors, isValid } = validateProfileInput(ProfileData);
        expect(isValid).to.be.true;
        expect(errors).to.deep.equal({});
        done();
    });
});

describe('Profile with missing major', () => {
    it('Should return error', done => {
        const ProfileData = {
            major: '',
            status: 'Sophomore',
            classes: 'CS343, HST123, CS203, THEO101'
        }

        const { errors, isValid } = validateProfileInput(ProfileData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({major: "Profile major is required"});
        done();
    });
});

describe('Profile with missing status', () => {
    it('Should return error', done => {
        const ProfileData = {
            major: 'Computer Science',
            status: '',
            classes: 'CS343, HST123, CS203, THEO101'
        }

        const { errors, isValid } = validateProfileInput(ProfileData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({status: 'Status field is required'});
        done();
    });
});

describe('Profile with missing classes', () => {
    it('Should return error', done => {
        const ProfileData = {
            major: 'Computer Science',
            status: 'Sophomore',
            classes: ''
        }

        const { errors, isValid } = validateProfileInput(ProfileData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({classes: 'Classes  required'});
        done();
    });
});
