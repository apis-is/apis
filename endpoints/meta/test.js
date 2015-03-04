var endpoint = require('./');

describe('Meta endpoints', function() {
  describe('Listing the maintainers', function() {
    it('should succeed', function(done) {
      endpoint.tester('/maintainers')
        .expect(200, done);
    });
  });
  describe('Listing the contributors', function() {
    it('should succeed', function(done) {
      endpoint.tester('/contributors')
        .expect(200, done);
    });
  });
  describe('Listing the sponsors', function() {
    it('should succeed', function(done) {
      endpoint.tester('/contributors')
        .expect(200, done);
    });
  });
  describe('Getting the about content', function() {
    it('should succeed', function(done) {
      endpoint.tester('/about')
        .expect(200, done);
    });
  });
});
