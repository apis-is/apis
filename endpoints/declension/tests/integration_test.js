var request = require('request'),
    assert = require('assert'),
    helpers = require('../../../lib/test_helpers.js');

describe('declension/laugavegur', function() {

     it("should return an array of objects containing correct fields", function(done) {
        var fieldsToCheckFor = ["results", "type"];
        var params = helpers.testRequestParams("/laugavegur", {
            word: "laugavegur",
        });
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });


});
