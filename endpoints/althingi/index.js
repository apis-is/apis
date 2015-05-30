var endpoint = module.exports = require('apis-endpoint')();

var Promise = require('bluebird');
var althingi = Promise.promisifyAll(require('althingi'));

endpoint.get('/', althingi.listAsync);

endpoint.get('/:id/vote', function(data) {
  return althingi.votesAsync(data.id);
});
