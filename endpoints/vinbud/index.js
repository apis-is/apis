var endpoint = module.exports = require('apis-endpoint')();
var vinbud = require('bluebird').promisifyAll(require('vinbud'));

endpoint.get('/', function(data) {
  return vinbud.opening_timesAsync(data);
});

endpoint.get('/items', vinbud.itemsAsync);