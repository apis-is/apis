var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('zip', function() {
    it("should return an array of objects containing correct fields", function(done) {
	var fieldsToCheckFor = ['street', 'house', 'zip', 'city', 'apartment',
			    	'letter']
        var params = helpers.testRequestParams("/address", { address: "laugavegur 26" });
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});
