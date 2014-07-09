var request = require('request');
var helpers = require('../../../lib/test_helpers.js');

describe('tv - skjar1', function () {
    this.timeout(8000);
    it("should return an array of objects containing correct fields", function (done) {
        var fieldsToCheckFor = ["series", "title", "originalTitle", "description", "live", "premier"];
        var params = helpers.testRequestParams("/tv/skjar1");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});

describe('tv - stod2', function () {
    it("should return an array of objects containing correct fields", function (done) {
        var fieldsToCheckFor = ["series", "title", "originalTitle", "description", "live", "premier"];
        var params = helpers.testRequestParams("/tv/stod2");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});

describe('tv - ruv', function () {
    this.timeout(8000);
    it("should return an array of objects containing correct fields", function (done) {
        var fieldsToCheckFor = ["series", "title", "originalTitle", "description", "live", "premier"];
        var params = helpers.testRequestParams("/tv/ruv");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});