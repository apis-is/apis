var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('cinema', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["image", "imdb", "released", "restricted", "showtimes", "title"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/cinema");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});

describe('cinema theaters', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["image", "name", "location", "movies"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/cinema/theaters");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});