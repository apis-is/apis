//process.env.NODE_ENV = 'testing';
var app = require('./index.js');
var supertest = require('supertest');
var assert = require('assert');

// TODO: test core features 
describe('Core APIs.is', function() {
  describe('GET /', function() {
    it('should redirect to docs.apis.is', function(done) {
      supertest(app)
        .get('/')
        .expect(302)
        .expect('location', /docs\.apis\.is/, done);
    });
  });
  
  describe('GET /thispathshouldntexist', function() {
    it('should return a 404 in JSON', function(done) {
      supertest(app)
        .get('/thispathshouldntexist')
        .expect(404)
        .expect('content-type', /^application\/json/, done);
    });
  });

  describe('GET /docs.json', function() {
    it('should return an array of docs for all endpoints', function(done) {
      supertest(app)
        .get('/docs.json')
        .expect(200)
        .expect('content-type', /^application\/json/)
        .expect(function(res) {
          assert(Array.isArray(res.body), 'res.body should be an object');
        })
        .end(done);
    });
  });
});

// Itterate and run endpoints integration tests
require('fs').readdirSync('./endpoints/').forEach(function(path) {
  describe('/' + path, function() {
    require('./endpoints/' + path + '/test');
  });
});
