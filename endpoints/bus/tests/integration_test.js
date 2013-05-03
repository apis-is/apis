var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('bus', function() {
    this.timeout(0); // this endpoint is slow

    var fieldsToCheckFor = ["busNr","busses"];

    var customCheck = function(json) {
        var busses = json.results[0].busses;
        assert(busses.length > 0, "The array of busses should not be empty!");
        helpers.assertPresenceOfFields(["unixTime","x","y","from","to"], busses);
    };

    describe('realtime', function() {
        describe('searching a single bus', function() {
            it("should return an array of objects containing correct fields", function(done) {
                var params = helpers.testRequestParams("/bus/realtime?busses=1");
                var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, customCheck);
                request.get(params, resultHandler);
            });
        });
        describe('searching multiple busses', function() {
            it("should return an array of objects containing correct fields", function(done) {
                var params = helpers.testRequestParams("/bus/realtime?busses=1,5");
                var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, customCheck);
                request.get(params, resultHandler);
            });
        });
        describe('searching for a non existant bus', function() {
            it("should return an array of objects containing correct fields", function(done) {
                var params = helpers.testRequestParams("/bus/realtime?busses=999");
                var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
                request.get(params, resultHandler);
            });
        });
    });
});
