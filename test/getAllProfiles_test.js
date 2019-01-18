const sinon = require('sinon');

const Profile = require('../models/Profile');

describe("Get all user profiles", () => {
    it("should return all profiles", (done) => {
        const ProfileMock = sinon.mock(Profile);
        const expected = { status: true, profiles: [] };
        ProfileMock.expects('find').yields(null, expected);
        Profile.find((err, result) => {
            ProfileMock.verify();
            ProfileMock.restore();
            done();
        });
    });
});

