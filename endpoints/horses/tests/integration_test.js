var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

var fieldsToCheckFor = [
  "id",
  "name_and_origin",
  "ueln","date_of_birth",
  "color_code",
  "color",
  "country_located",
  "fate",
  "microchip",
  "father",
  "mother"
];

describe('multi-results', function() {
  this.timeout(20000);
  it("should return an array of objects containing correct fields", function(done) {
    var params = helpers.testRequestParams("/horses", { name: "Oddur", origin: "Selfossi" });
    var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
    request.get(params, resultHandler);
  });
});

describe('single-result-by-name', function() {
  it("should return an array of objects containing correct fields", function(done) {
    var params = helpers.testRequestParams("/horses", { name: "Fálki", origin: "Geirshlíð" });
    var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
    request.get(params, resultHandler);
  });
});

describe('single-result-partial-info', function() {
  this.timeout(20000);
  it("should return an array of objects containing correct fields", function(done) {
    var params = helpers.testRequestParams("/horses", { name: "Lotta", origin: "Ármóti" });
    var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
    request.get(params, resultHandler);
  });
});

describe('single-result-by-id', function() {
  it("should return an array of objects containing correct fields", function(done) {
    var params = helpers.testRequestParams("/horses", { id: "IS1987187700" });
    var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
    request.get(params, resultHandler);
  });
});
