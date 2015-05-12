var endpoint = require('./');

describe('Looking up opening times', function() {
  it('should succeed', function(done) {
    endpoint.tester('/').expect(200, done);
  });
});

describe('Looking up items', function() {
  it('should succeed', function(done) {
    endpoint.tester('/items').expect(200, done);
  });
});
