var endpoint = module.exports = require('apis-endpoint')();
var tvinna = require('bluebird').promisify(require('tvinna'));

endpoint.get('/tvinna', tvinna);