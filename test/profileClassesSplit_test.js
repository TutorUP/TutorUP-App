const chai = require('chai');
const expect = chai.expect;

const splitString = string => {
    let profileClasses = string.split(',').map(el => el.trim());
    return profileClasses;
}

describe("Splits comma-separated String into array", () => {
    it('Should format classes as array', done => {
        let classes = 'CS345, CS123, PHY247, HIS203, ENG112, THTR203';
        expect(splitString(classes)).to.have.lengthOf(6);
        done();
    });
});