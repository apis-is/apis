var endpoint = require('./');

describe('Searching', function() {
  it('should succeed', function(done) {
    endpoint.tester('/?name=Akureyri')
      .expect(200, done);
  });
});
