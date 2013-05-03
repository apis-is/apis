var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('currency', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["shortName", "longName", "value", "askValue", "bidValue", "changeCur", "changePer"];

    describe('searching using provider "m5"', function() {
        this.timeout(6000); // This endpoint is SLOW, need more time
        it("should return an array of objects containing correct fields", function(done) {
            var params = helpers.testRequestParams("/currency/m5");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request(params, resultHandler);
        });
    });
    describe('searching using provider "arion"', function() {
        it("should return an array of objects containing correct fields", function(done) {
            var params = helpers.testRequestParams("/currency/arion");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request(params, resultHandler);
        });
    });
});
