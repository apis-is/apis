var endpoint = require('./');

describe('Tvinna', function() {
  it('should succeed', function(done) {
    endpoint.tester('/tvinna')
      .expect(200, done);
  });
});
