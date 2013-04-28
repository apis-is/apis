var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('cars', function() {
    it("should return an array of objects containing correct fields", function(done) {
        var fieldsToCheckFor = ["registryNumber","number","factoryNumber","type","subType","color","registeredAt","status","nextCheck","pollution","weight"];
        var params = helpers.testRequestParams("/car", { number: "AA031" });
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.post(params, resultHandler);
    });
});
