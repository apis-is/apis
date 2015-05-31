var endpoint = module.exports = require('apis-endpoint')();

var firm = require('bluebird').promisifyAll(require('firm'));

endpoint.get('/is', function(data) {
  return firm.isAsync(data);
});

endpoint.get('/is/:kt', function(data) {
  return firm.isAsync({ssn: data.kt}).then(function(firms){
    return firms.results.length > 0 ? firms.results[0] : {};
  });
});
