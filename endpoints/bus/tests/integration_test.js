/* eslint-disable */

var request = require('request')
var assert = require('assert')
var helpers = require('../../../lib/test_helpers.js')
var sinon = require('sinon')
var getBusRoutes = require('../realtime.js').default

describe('bus', function () {
  var fieldsToCheckFor = ['busNr', 'busses']

  var customCheck = function (json) {
    var busses = json.results[0].busses
    if (busses.length > 0) return
      helpers.assertPresenceOfFields(['unixTime', 'x', 'y', 'from', 'to'], busses)
  }

  describe('realtime', function () {
    describe('searching a single bus', function () {
      it('should return an array of objects containing correct fields', function (done) {
        var params = helpers.testRequestParams('/bus/realtime?busses=1')
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, customCheck)
        request.get(params, resultHandler)
      })
    })

    describe('searching multiple busses', function () {
      it('should return an array of objects containing correct fields', function (done) {
        var params = helpers.testRequestParams('/bus/realtime?busses=1,5')
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, customCheck)
        request.get(params, resultHandler)
      })
    })

    describe('searching for a non existant bus', function () {
      it('should return an array of objects containing correct fields', function (done) {
        var params = helpers.testRequestParams('/bus/realtime?busses=999')
        var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
        request.get(params, resultHandler)
      })
    })

    describe('when the data source returns an error', () => {
      before(function(){
        sinon
          .stub(request, 'get')
          .yields('We don\'t want no scrapers around these here parts', null, null)
      });

      after(function(){
        request.get.restore();
      });

      it('should return a appropriate message', (done) => {
        getBusRoutes({})
          .then((data) => {
            should.fail('Got back data even though the data source returned an error')
          })
          .catch((error) => done())
      })
    })
  })
})
