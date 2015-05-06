var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('hljomaholl', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ['date', 'time', 'image','title', 'description','location'];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/hljomaholl");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});


