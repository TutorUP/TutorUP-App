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

// Test the GET profiles
describe('/GET profiles', () => {
    it('should GET all profiles', done => {
        chai.request(server)
            .get('/api/profile/all')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(5);
                done();
            });
    });
});