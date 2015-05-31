var endpoint = module.exports = require('apis-endpoint')();
var Promise = require('bluebird');
var tvinna = Promise.promisify(require('tvinna'));

endpoint.get('/tvinna', tvinna);