const request = require('supertest');
const app = require('../server');

describe('Test the landing page at root', () => {
    it('it should GET the landing page successfully', () => {
        return request(app).get('/').expect(200);
    });
});