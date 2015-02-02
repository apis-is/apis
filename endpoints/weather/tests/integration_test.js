var request = require('request');
var helpers = require('../../../lib/test_helpers.js');
var assert = require('assert');

describe('weather', function(){
    this.timeout(4000);
    it("should return info", function (done) {
        var fieldsToCheckFor = ["info"];
        var params = helpers.testRequestParams("/weather/");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
    describe('getAvailableStations', function () {
        it("should return an array of objects containing correct fields", function (done) {
            var fieldsToCheckFor = ["name", "id"];
            var params = helpers.testRequestParams("/weather/getAvailableStations");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request.get(params, resultHandler);
        });
    });
    describe('forecasts', function () {
        it("should return an error", function (done) {
            var fieldsToCheckFor = ["error"];
            var params = helpers.testRequestParams("/weather/forecasts/");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request.get(params, resultHandler);
        });
        it("should return an error", function (done) {
            var fieldsToCheckFor = ["error"];
            var params = helpers.testRequestParams("/weather/forecasts/se?stations=1");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request.get(params, resultHandler);
        });
        it("should return an array of objects containing correct fields", function (done) {
            var fieldsToCheckFor = ["name", "atime", "link", "forecast", "id", "valid"];
            var params = helpers.testRequestParams("/weather/forecasts?stations=1");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, function(json){
                var forecasts = json.results[0].forecast;
                helpers.assertPresenceOfFields(["ftime","F","D","T","W"], forecasts);
            });
            request.get(params, resultHandler);
        });
        it("should return an array of objects containing correct fields and descriptions", function (done) {
            var fieldsToCheckFor = ["name", "atime", "link", "forecast", "id", "valid"];
            var params = helpers.testRequestParams("/weather/forecasts?stations=1&descriptions");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, function(json){
                helpers.assertPresenceOfFields(["descriptions"], [json]); // helper function only works on arrays
            });
            request.get(params, resultHandler);
        });
        it("should return an array with 1 result", function (done) {
            this.timeout(4000);
            var params = helpers.testRequestParams("/weather/forecasts?stations=1");
            request.get(params, function(err, res, body) {
                if (err) throw err;
                var json;
                try{
                    json = JSON.parse(body);
                }catch(e){
                    throw e;
                }
                assert.equal(1, json.results.length);
                done();
            });
        });
        it("should return an array with 2 results", function (done) {
            var params = helpers.testRequestParams("/weather/forecasts?stations=1,422");
            request.get(params, function(err, res, body) {
                if (err) throw err;
                var json;
                try{
                    json = JSON.parse(body);
                }catch(e){
                    throw e;
                }
                assert.equal(2, json.results.length);
                done();
            });
        });
    });

    describe('observations', function () {
        it("should return an error", function (done) {
            var fieldsToCheckFor = ["error"];
            var params = helpers.testRequestParams("/weather/observations/");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request.get(params, resultHandler);
        });
        it("should return an error", function (done) {
            var fieldsToCheckFor = ["error"];
            var params = helpers.testRequestParams("/weather/observations/fi?stations=1");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request.get(params, resultHandler);
        });
        it("should return an array of objects containing correct fields", function (done) {
            var fieldsToCheckFor = ["name", "time", "link", "F", "D", "FX", "FG", "T", "W", "V", "R", "id", "valid"];
            var params = helpers.testRequestParams("/weather/observations?stations=1");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request.get(params, resultHandler);
        });
        it("should return an array of objects containing correct fields and descriptions", function (done) {
            var fieldsToCheckFor = ["name", "time", "link", "F", "D", "FX", "FG", "T", "W", "V", "R", "id", "valid"];
            var params = helpers.testRequestParams("/weather/observations?stations=1&descriptions");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, function(json){
                helpers.assertPresenceOfFields(["descriptions"], [json]); // helper function only works on arrays
            });
            request.get(params, resultHandler);
        });
        it("should return an array with 1 result", function (done) {
            var params = helpers.testRequestParams("/weather/observations?stations=1");
            request.get(params, function(err, res, body) {
                if (err) throw err;
                var json;
                try{
                    json = JSON.parse(body);
                }catch(e){
                    throw e;
                }
                assert.equal(1, json.results.length);
                done();
            });
        });
        it("should return an array with 2 results", function (done) {
            var params = helpers.testRequestParams("/weather/observations?stations=1,422");
            request.get(params, function(err, res, body) {
                if (err) throw err;
                var json;
                try{
                    json = JSON.parse(body);
                }catch(e){
                    throw e;
                }
                assert.equal(2, json.results.length);
                done();
            });
        });
    });

    describe('texts', function () {
        it("should return an error", function (done) {
            var fieldsToCheckFor = ["error"];
            var params = helpers.testRequestParams("/weather/texts/");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request.get(params, resultHandler);
        });
        it("should return an error", function (done) {
            var fieldsToCheckFor = ["error"];
            var params = helpers.testRequestParams("/weather/texts/nk?types=5");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request.get(params, resultHandler);
        });
        it("should return an array of objects containing correct fields", function (done) {
            var fieldsToCheckFor = ["title", "creation", "valid_from", "valid_to", "content", "id"];
            var params = helpers.testRequestParams("/weather/texts?types=5");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request.get(params, resultHandler);
        });
        it("should return an array with 1 result", function (done) {
            var params = helpers.testRequestParams("/weather/texts?types=5");
            request.get(params, function(err, res, body) {
                if (err) throw err;
                var json;
                try{
                    json = JSON.parse(body);
                }catch(e){
                    throw e;
                }
                assert.equal(1, json.results.length);
                done();
            });
        });
        it("should return an array with 2 results", function (done) {
            this.timeout(4000);
            var params = helpers.testRequestParams("/weather/texts?types=5,6");
            request.get(params, function(err, res, body) {
                if (err) throw err;
                var json;
                try{
                    json = JSON.parse(body);
                }catch(e){
                    throw e;
                }
                assert.equal(2, json.results.length);
                done();
            });
        });
    });
});
