process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Profile = require('../models/Profile');

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

// Clean up
describe('Profile', () => {
    beforeEach(done => {
        Profile.remove({}, err => {
            done();
        });
    });
});