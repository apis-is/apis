var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('lotto', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["date", "lotto", "joker", "prize", "link"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/lottery");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
describe('lotto', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["date", "lotto", "joker", "prize", "link"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/lottery/lotto");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
describe('vikingslotto', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["date", "lotto", "joker", "prize", "link"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/lottery/vikingslotto");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
describe('eurojackpot', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["date", "lotto", "joker", "prize", "link"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/lottery/eurojackpot");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});