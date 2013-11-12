var request = require('request'),
    assert = require('assert'),
    helpers = require('../../../lib/test_helpers.js');

describe('bus', function () {
    this.timeout(0); // this endpoint is slow

    var fieldsToCheckFor = ['busNr', 'buses'];

    var customCheck = function (json) {
        var buses = json.results[0].buses;
        if (buses.length > 0) {
            return;
        }
        helpers.assertPresenceOfFields(['unixTime', 'x', 'y', 'from', 'to'], buses);
    };

    describe('realtime', function () {
        describe('searching a single bus', function () {
            it('should return an array of objects containing correct fields', function (done) {
                var params = helpers.testRequestParams('/bus/realtime?buses=1');
                var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, customCheck);
                request.get(params, resultHandler);
            });
        });
        describe('searching multiple buses', function () {
            it('should return an array of objects containing correct fields', function (done) {
                var params = helpers.testRequestParams('/bus/realtime?buses=1,5');
                var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, customCheck);
                request.get(params, resultHandler);
            });
        });
        describe('searching for a non existant bus', function () {
            it('should return an array of objects containing correct fields', function (done) {
                var params = helpers.testRequestParams('/bus/realtime?buses=999');
                var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
                request.get(params, resultHandler);
            });
        });
    });
});
