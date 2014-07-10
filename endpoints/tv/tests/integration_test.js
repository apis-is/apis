var request = require('request');
var helpers = require('../../../lib/test_helpers.js');

describe('tv root', function(){
    it("should return info", function (done) {
        var fieldsToCheckFor = ["info"];
        var params = helpers.testRequestParams("/tv/");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});
describe('tv - skjar1', function () {
    this.timeout(8000);
    it("should return an array of objects containing correct fields", function (done) {
        var fieldsToCheckFor = ["series", "title", "originalTitle", "description", "live", "premier"];
        var params = helpers.testRequestParams("/tv/skjar1");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});

describe('tv - stod2 gull', function () {
    it("should return an array of objects containing correct fields", function (done) {
        var fieldsToCheckFor = ["series", "title", "originalTitle", "description", "live", "premier"];
        var params = helpers.testRequestParams("/tv/stod2gull");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});

describe('tv - stod2 bio', function () {
    it("should return an array of objects containing correct fields", function (done) {
        var fieldsToCheckFor = ["series", "title", "originalTitle", "description", "live", "premier"];
        var params = helpers.testRequestParams("/tv/stod2bio");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});

describe('tv - stod3', function () {
    it("should return an array of objects containing correct fields", function (done) {
        var fieldsToCheckFor = ["series", "title", "originalTitle", "description", "live", "premier"];
        var params = helpers.testRequestParams("/tv/stod3");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});

describe('tv - stod2 sport2', function () {
    it("should return an array of objects containing correct fields", function (done) {
        var fieldsToCheckFor = ["series", "title", "originalTitle", "description", "live", "premier"];
        var params = helpers.testRequestParams("/tv/stod2sport2");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});

describe('tv - stod2 sport', function () {
    it("should return an array of objects containing correct fields", function (done) {
        var fieldsToCheckFor = ["series", "title", "originalTitle", "description", "live", "premier"];
        var params = helpers.testRequestParams("/tv/stod2sport");
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

describe('tv - ruv ithrottir', function () {
    this.timeout(8000);
    it("should return an array of objects containing correct fields", function (done) {
        var fieldsToCheckFor = ["series", "title", "originalTitle", "description", "live", "premier"];
        var params = helpers.testRequestParams("/tv/ruvithrottir");
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