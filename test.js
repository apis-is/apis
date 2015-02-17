//process.env.NODE_ENV = 'testing';
var app = require('./index.js');
var supertest = require('supertest');

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

  describe('GET /status', function() {
    it.skip('should return status of each endpoint / or redirect to status.apis.is?');
  });
});

// Itterate and run endpoints integration tests
require('fs').readdirSync('./endpoints/').forEach(function(path) {
  describe('/' + path, function() {
    require('./endpoints/' + path + '/test');
  });
});
