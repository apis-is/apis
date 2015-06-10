var endpoint = module.exports = require('apis-endpoint')();

var car = require('bluebird').promisifyAll(require('car'));

endpoint.get('/is/:carPlate', function(data) {
  return car.isAsync(data.carPlate);
});
