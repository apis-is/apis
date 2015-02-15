var endpoint = require('./');

describe('Searching', function() {
  it('should succeed', function(done) {
    endpoint.tester('/vinbud?name=Akureyri')
      .expect(200, done);
  });
});
