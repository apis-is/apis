var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('happyhour', function() {
  var fieldsToCheckFor = ['address', 'beerprice', 'foursquare_id', 'happy_hour_days', 'happy_hour_end', 'happy_hour_start', 'has_polar', 'lat', 'lng', 'name', 'review', 'stars', 'wineprice'];
  
  it("should return an array of objects containing correct fields", function(done) {
    var params = helpers.testRequestParams("/happyhour");
    var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor);
    request.get(params, resultHandler);
  });
});
