var request = require('request')
var assert = require('assert')
var helpers = require('../../../lib/test_helpers.js')

describe.skip('handball', function () {
  it('should return an array of objects containing correct fields', function (done) {
    var fieldsToCheckFor = ['Date', 'Time', 'Tournament', 'Venue', 'Teams']
    var params = helpers.testRequestParams('/sports/handball', {
      language: 'en'
    })

    var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe.skip('football', function () {
  it('should return an array of objects containing correct fields', function (done) {
    var fieldsToCheckFor = ['counter', 'date', 'time', 'tournament', 'location', 'homeTeam', 'awayTeam']
    var params = helpers.testRequestParams('/sports/football', {
      language: 'en'
    })

    var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

testFootballLeague('male-leagues/borgun')
testFootballLeague('male-leagues/pepsi')
testFootballLeague('male-leagues/1st')
testFootballLeague('male-leagues/2nd')
testFootballLeague('male-leagues/3rd')

testFootballLeague('female-leagues/borgun')
testFootballLeague('female-leagues/pepsi')

function testFootballLeague(leagueParams) {
  describe('football/' + leagueParams, function () {
    it('should return an array of objects containing correct fields', function (done) {
      var fieldsToCheckFor = ['counter', 'date', 'time', 'teams', 'location', 'scores']
      var params = helpers.testRequestParams('/sports/football/' + leagueParams, {
        language: 'en'
      })

      var resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })
}
