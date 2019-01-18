const chai = require('chai');
const expect = chai.expect;
const validateProfileInput = require('../validation/profileValidation');

describe('Profile with valid input', () => {
    it('Should Profile properly', done => {
        const ProfileData = {
            major: 'Computer Science',
            status: 'Sophomore',
            classes: ['CS341', 'HST123', 'CS203', 'THEO101']
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
            classes: ['CS341', 'HST123', 'CS203', 'THEO101']
        }

        const { errors, isValid } = validateProfileInput(ProfileData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({major: "Profile major is required"});
        done();
    });
});

// describe('Profile with invalid password (empty password)', () => {
//     it('Should return error', done => {
//         const ProfileData = {
//             email: 'miles@up.edu',
//             password: '',
//             password2: ''
//         }

//         const { errors, isValid } = validateProfileInput(ProfileData);
//         expect(isValid).to.be.false;
//         expect(errors).to.deep.equal({
//             password: "Password must be at least 6 characters"
//         });
//         done();
//     });
// });

// describe('Profile with invalid password (non-proper length)', () => {
//     it('Should return error', done => {
//         const ProfileData = {
//             email: 'miles@up.edu',
//             password: 'miles',
//             password2: 'miles'
//         }

//         const { errors, isValid } = validateProfileInput(ProfileData);
//         expect(isValid).to.be.false;
//         expect(errors).to.deep.equal({password: "Password must be at least 6 characters"});
//         done();
//     });
// });

// describe('Profile with empty form', () => {
//     it('Should return error', done => {
//         const ProfileData = {
//             email: '',
//             password: '',
//         }

//         const { errors, isValid } = validateProfileInput(ProfileData);
//         expect(isValid).to.be.false;
//         expect(errors).to.deep.equal({
//             email: "Email field is required",
//             password: "Password must be at least 6 characters",
//         });
//         done();
//     });
// });

