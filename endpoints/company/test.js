var endpoint = require('./'); 

describe('Iceland', function() {
  describe('Searching', function() {
    it('should succeed', function(done) {
      endpoint.tester('/is?name=blendin')
        .expect(200, done);
    });
  });

  describe('Looking up by ssn', function() {
    it('should succeed', function(done) {
      endpoint.tester('/is/6510992429')
        .expect(200, done);
    });
  });
});
