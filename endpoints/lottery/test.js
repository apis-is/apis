var endpoint = require('./');

describe('lotto', function() {
  it('should not error', function(done) {
    endpoint.tester('/lotto').expect(200, done);
  });
});

describe('vikingalotto', function() {
  it('should not error', function(done) {
    endpoint.tester('/vikingalotto').expect(200, done);
  });
});
describe('eurojackpot', function() {
  it('should not error', function(done) {
    endpoint.tester('/eurojackpot').expect(200, done);
  });
});
