// TODO: test core features 
describe('Core APIs.is', function() {
  describe('GET /', function() {
    it.skip('should redirect to docs.apis.is');
  });

  describe('GET /status', function() {
    it.skip('should return status of each endpoint');
  });
});

// Itterate and run endpoints integration tests
require('fs').readdirSync('./endpoints/').forEach(function(path) {
  describe('/' + path, function() {
    require('./endpoints/' + path + '/test');
  });
});
