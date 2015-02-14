var endpoint = require('./'); 

describe('Searching', function() {
  it('should succeed', function(done) {
    endpoint.tester('/is?name=blendin')
      .expect(200, done);
  });
});