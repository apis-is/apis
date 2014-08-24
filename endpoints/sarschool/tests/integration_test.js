var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('sarschool', function() {
	this.timeout(15000);

    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["id", "name", "time_start", "time_end", "sar_members_only", "host", "location", "price_regular", "price_members", "link"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/sarschool");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});