var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('bjorgunarskoli', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["availability", "id", "name", "sveit", "start", "end", "location", "price_regular", "price_members", "status", "link"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/bjorgunarskoli");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
