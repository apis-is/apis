var request = require('request'),
    assert = require('assert'),
    helpers = require('../../../lib/test_helpers.js');

describe('earthquake/is', function() {
    this.timeout(8000); // This endpoint is a bit slow

    // Which fields we expect and of which type they should be
    var fieldsToCheckFor = {
        "timestamp": Date,
        "latitude": Number,
        "longitude": Number,
        "depth": Number,
        "size": Number,
        "quality": Number,
        "humanReadableLocation": String
    };

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/earthquake/is");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
