var endpoint = require('./');

describe('Searching', function() {
  it('should succeed', function(done) {
    endpoint.tester('/is/abba')
      .expect(200, done);
  });
});
