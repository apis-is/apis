var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('currency', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ["shortName", "longName", "value", "askValue", "bidValue", "changeCur", "changePer"];

    describe('searching using provider "m5"', function() {
        it("should return an array of objects containing correct fields", function(done) {
            var params = helpers.testRequestParams("/currency/m5");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request(params, resultHandler);
        });
    });
    describe('searching using provider "arion"', function() {
        it("should return an array of objects containing correct fields", function(done) {
            var params = helpers.testRequestParams("/currency/arion");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request(params, resultHandler);
        });
    });
    describe('searching using provider "lb"', function() {
        it("should return an array of objects containing correct fields", function(done) {
            var params = helpers.testRequestParams("/currency/lb");
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request(params, resultHandler);
        });
    });
    describe('searching using provider "borgun"', function(){
        it("should return an array of objects containing correct fields", function(done){
            var params = helpers.testRequestParams("/currency/borgun");
            var fields = ["currencyCode", "currencyDescription", "currencyRate", "country", "countryEnglish", "countryCode", "rateDate"];
            var resultHandler = helpers.testRequestHandlerForFields(done, fields);
            request(params, resultHandler);
        });
    });
});
