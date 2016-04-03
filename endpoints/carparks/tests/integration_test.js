var request = require('request')
var assert = require('assert')
var helpers = require('../../../lib/test_helpers.js')

describe('carparks', function () {
  it('should return an array of objects containing correct fields', function (done) {
    var fieldsToCheckFor = ['name', 'address', 'parkingSpaces', 'coordinates']
    var params = helpers.testRequestParams('/carparks')
    var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
