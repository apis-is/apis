var endpoint = require('./');

describe('Fetching a single address' , function() {
  it('should succeed', function(done) {
    endpoint.tester('/laugarvegur/').expect(200, done);
  });
});
