const assert = require('assert');
const request = require('supertest');
const express = require('express');
const app = require('../server');

// describe('GET /user', function() {
//     it('responds with json', function(done) {
//       request(app)
//         .get('/profiles')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', "text/html; charset=utf-8")
//         .expect(200, done);
//     });
//   });

  describe('Unit testing the /profiles route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/api/profile/all')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });
});