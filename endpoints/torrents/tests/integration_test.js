var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('torrents', function() {
    var fieldsToCheckFor = ["id", "created_at", "updated_at", "domain", "ssl", "up", "inviteonly", "clickcount", "hidden"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/torrents");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
