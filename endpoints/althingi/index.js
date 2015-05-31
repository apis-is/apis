var endpoint = module.exports = require('apis-endpoint')();

var althingi = require('bluebird').promisifyAll(require('althingi'));

endpoint.get('/', althingi.listAsync);

endpoint.get('/:id/vote', function(data) {
  return althingi.votesAsync(data.id);
});
