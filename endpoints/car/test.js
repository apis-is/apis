var endpoint = require('./');

describe('Searching', function() {
  it('should succeed', function(done) {
    endpoint.tester('/is/aa031')
      .expect(200, done);
  });
});
