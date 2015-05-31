var endpoint = module.exports = require('apis-endpoint')();

var Promise = require('bluebird');
var car = Promise.promisifyAll(require('car'));

endpoint.get('/is/:carPlate', function(data) {
  return car.isAsync(data.carPlate);
});
