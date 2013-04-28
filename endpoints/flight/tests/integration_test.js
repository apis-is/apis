var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('flight', function() {
    it("should return an array of objects containing correct fields", function(done) {
        var fieldsToCheckFor = ["date","flightNumber","to","plannedArrival","realArrival","status"];
        var params = helpers.testRequestParams("/flight", {
            language: "en",
            type: "departures"
        });
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.post(params, resultHandler);
    });
});
