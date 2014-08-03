/*
About:   Integration tests for the Names API
Author:  Hjörtur Líndal Stefánsson
Email:   hjorturls@gmail.com
Created: August 2014 
*/

var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

/* Test the /names/males endpoint with filtering */
describe('males-filtered', function() {
    testFiltered("/names/males");
});

/* Test the /names/males endpoint with invalid filtering */
describe('males-filtered-invalid', function() {
    testFilteredEmpty("/names/males");
});

/* Test the /names/males endpoint without filtering */
describe('males', function() {
    testUnfiltered("/names/males");
});

/* Test the /names/females endpoint with filtering */
describe('females-filtered', function() {
    testFiltered("/names/females");
});

/* Test the /names/females endpoint with invalid filtering */
describe('females-filtered-invalid', function() {
    testFilteredEmpty("/names/males");
});

/* Test the /names/females endpoint without filtering */
describe('females', function() {
    testUnfiltered("/names/females");
});

/* Test the /names/middlenames endpoint with filtering */
describe('middlenames-filtered', function() {
    testFiltered("/names/middlenames");
});

/* Test the /names/middlenames endpoint with invalid filtering */
describe('middlenames-filtered-invalid', function() {
    testFilteredEmpty("/names/middlenames");
});

/* Test the /names/middlenames endpoint without filtering */
describe('middlenames', function() {
    testUnfiltered("/names/middlenames");
});

/* Test the unfiltered list of names */
function testUnfiltered(url) {
    it("should return an array of strings", function(done) {
        var params = helpers.testRequestParams(url, {});

        assertResults(params);
        done();
    });
}

/* Test filtering with an invalid string */
function testFilteredEmpty(url) {
    it("should return an array of strings", function(done) {
        var params = helpers.testRequestParams(url, {
            search: "234asdf"
        });

        assertResults(params, true);
        done();
    });
}

/* Test filtering the results with a valid filter */
function testFiltered(url) {
    it("should return an array of strings", function(done) {
        var params = helpers.testRequestParams(url, {
            search: "Sig"
        });

        assertResults(params);
        done();
    });
}

/* Asserts the results */
function assertResults(params, shouldBeEmpty) {
    shouldBeEmpty = shouldBeEmpty || false;
    request.get(params, function(err, res, body) {
            json = JSON.parse(body);

            assert(json.results && typeof json.results.length !== "undefined", "Does not contain a 'results' field");
            if (!shouldBeEmpty) {
                assert(json.results.length > 0, "Results are empty");
            }
            else {
                assert(json.results.length <= 0, "Results are NOT empty");
            }
        });
}