var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('torrents', function() {
    // I just copied the cinema test so i hope this is correct
    // {"id":53,
    // "created_at":"2000-01-01T00:00:00.000Z",
    // "updated_at":"2015-01-22T22:57:24.791Z",
    // "domain":"icetracker.org",
    // "ssl":false,
    // "up":false,
    // "inviteonly":false,
    // "clickcount":15600,
    // "hidden":false}
    
    var fieldsToCheckFor = ["image", "imdb", "released", "restricted", "showtimes", "title"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/cinema");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});