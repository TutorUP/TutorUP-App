// const chai = require('chai');
// const should = chai.should();
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);

// const server = require('../server');

// describe('Test register of new user POST/register', () => {
//     it('should register a new use', done => {
//         chai.request(server)
//         .post('/api/users/register')
//         .send({
//             name: 'Miles Morales',
//             email: 'spidey2@gmail.com',
//             password: 'morales123',
//             avatar: 'Avatar here'
//         })
//         .end((err, res) => {
//             should.not.exist(err);
//             res.redirects.length.should.eql(0);
//             res.status.should.eql(200);
//             res.type.should.eql('application/json');
//             res.body.status.should.eql('success');
//             done();
//         });
//     });
// });