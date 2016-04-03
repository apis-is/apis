var request = require('request')
var assert = require('assert')
var helpers = require('../../../lib/test_helpers.js')

describe('golf', function () {
    // The only thing that changes is the form attribute, so why not just re-use the object
  var fieldsToCheckFor = ['abbreviation', 'club', 'location']

  it('should return an array of objects containing correct fields', function (done) {
    var params = helpers.testRequestParams('/golf/clubs')
    var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})

describe('golf', function () {
    // The only thing that changes is the form attribute, so why not just re-use the object
  var fieldsToCheckFor = ['time', 'name', 'club', 'handicap']

  it('should return an array of objects containing correct fields', function (done) {
    var params = helpers.testRequestParams('/golf/teetimes', { club: 61 })
    var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
