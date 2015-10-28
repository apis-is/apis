var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('isboltinn', function() {

    it('Should return an array of objects with fixed amount of fields.', function(done) {
        var fields = ['place','team','gamesPlayed',
                     'gamesWon','gamesDraw','gamesLost',
                     'goals','goalDifference','points'];

        var params = helpers.testRequestParams("/isbolti", {});
        var resultHandler = helpers.testRequestHandlerForFields(done, fields);
        request.get(params, resultHandler);
    });
});
