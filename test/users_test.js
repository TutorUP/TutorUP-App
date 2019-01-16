const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
const User = require('../models/User');

describe("Get all users", () => {
    it("should return all users", (done) => {
        const UserMock = sinon.mock(User);
        const expected = { status: true, profiles: [] };
        UserMock.expects('find').yields(null, expected);
        User.find((err, result) => {
            UserMock.verify();
            UserMock.restore();
            done();
        });
    });
});

