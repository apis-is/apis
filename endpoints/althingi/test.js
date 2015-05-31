var endpoint = require('./');

describe('Listing all parliament members', function() {
  it('should succeed', function(done) {
    endpoint.tester('/').expect(200, done);
  });
});

describe('Fetching a single parliament member votes by id', function() {
  it('should succeed', function(done) {
    endpoint.tester('/1166/vote').expect(200, done);
  });
});
