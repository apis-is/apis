var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('concerts', function() {

    var fieldsToCheckFor = ["concerts", "date"];
    this.timeout(6000);
    it("should return an array of objects containing correct fields", function(done) {

        var params = helpers.testRequestParams("/concerts");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
        
    });
});
