var request = require('request');
var helpers = require('../../../lib/test_helpers.js');

describe('rides root', function(){
    it('should return info and endpoints', function (done) {
        var fieldsToCheckFor = ['info', 'endpoints'];
        var params = helpers.testRequestParams('/rides/');
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request.get(params, resultHandler);
    });
});

[ 'samferda-drivers', 'samferda-passengers' ].forEach(function (api) {
    var apiName = 'rides - ' + api;
    describe(apiName, function () {
        var fieldsToCheckFor = ['link', 'from', 'to', 'date', 'time'];
        it('should return an array of objects containing correct fields', function (done) {
            var params = helpers.testRequestParams('/rides/' + api);
            var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
            request.get(params, resultHandler);
        });
    });
  });
