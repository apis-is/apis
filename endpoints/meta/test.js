var endpoint = require('./');

describe('Listing the maintainers', function() {
  it('should succeed', function(done) {
    endpoint.tester('/')
      .expect(200, done);
  });
});
