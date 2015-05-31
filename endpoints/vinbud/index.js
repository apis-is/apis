var endpoint = module.exports = require('apis-endpoint')();
var Promise = require('bluebird');
var vinbud = Promise.promisifyAll(require('vinbud'));

endpoint.get('/', function(data) {
  return vinbud.opening_timesAsync(data);
});

endpoint.get('/items', vinbud.itemsAsync);