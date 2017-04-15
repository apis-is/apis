var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('skiresorts', function() {
    it("should return an array of objects containing correct fields", function(done) {
        var fieldsToCheckFor = ["name","resorts"];
        var params = helpers.testRequestParams("/skiresorts", {
            area: "reykjavik"       
        });
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});
