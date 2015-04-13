var endpoint = require('./');

describe('Searching', function() {
  it('should succeed', function(done) {
    endpoint.tester('/')
      .expect(200, done);
  });
});
