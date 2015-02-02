var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('hospital', function() {
    this.timeout(4000); // This endpoint is a bit slow
    // The only thing that changes is the form attribute, so why not just re-use the object
    var fieldsToCheckFor = ['birthNumbers', 'surgeries', 'dischargedNumbers',
			    'hospitalizedNumbers', 'atwork', 'patients-child',
		            'patients-er', 'patients-walk', 'patients-icu',
			    'patients-hotel', 'donors', 'patients-skilun',
 			    'patients-heart2'];

    it("should return an array of objects containing correct fields", function(done) {
        var params = helpers.testRequestParams("/hospital");
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
        request(params, resultHandler);
    });
});
