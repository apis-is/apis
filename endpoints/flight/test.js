var endpoint = require('./');

describe('Searching', function() {
  it('should succeed', function(done) {
    endpoint.tester('/kef?type=departures')
      .set('Accept-Language','is')
      .expect(200, done);
  });
});
