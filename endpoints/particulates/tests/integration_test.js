var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('particulates', function () {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ['PM10nuna', 'PM10medaltal', 'Counter', 'Dags', 'nanariuppl'];

    it('should return an array of objects containing correct fields', function (done) {
        var params = helpers.testRequestParams('/particulates');
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
