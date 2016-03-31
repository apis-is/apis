var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe.skip('lotto', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["date", "lotto", "joker", "prize", "link"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/lottery");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
describe.skip('lotto', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["date", "lotto", "joker", "prize", "link"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/lottery/lotto");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
describe.skip('vikingalotto', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["date", "lotto", "joker", "prize", "link"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/lottery/vikingalotto");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
describe.skip('eurojackpot', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["date", "lotto", "joker", "prize", "link"];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/lottery/eurojackpot");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
