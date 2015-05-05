process.env.NODE_ENV = 'testing';

var app = require('./index.js');
var supertest = require('supertest');
var assert = require('assert');
var fs = require('fs');

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

  describe('GET /status', function() {
    it('should return the uptime of the server', function(done) {
      supertest(app)
        .get('/status')
        .expect(200)
        .expect('content-type', /^application\/json/)
        .expect(function(res) {
          assert.equal(typeof res.body.uptime, 'number', 'res.body.uptime should be numeric');
          assert(!isNaN(res.body.uptime), 'res.body.uptime should not be NaN');
        })
        .end(done);
    });
  });
});

// Itterate and run endpoints integration tests
describe('Endpoints',function(){
  require('fs').readdirSync('./endpoints/').forEach(function(path) {
    describe('/' + path, function() {
      describe('Requirements', function() {
        var requiredFiles = ['/index.js', '/test.js', '/docs.json'];

        requiredFiles.forEach(function(name) {
          it('should include ' + name,function(){
            require.resolve('./endpoints/' + path + name);
          });
        });
      });

      if(fs.existsSync('./endpoints/' + path + '/test.js')){
        require('./endpoints/' + path + '/test');
      }
    });
  });
});
