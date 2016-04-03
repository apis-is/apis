import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe.skip('handball', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['Date', 'Time', 'Tournament', 'Venue', 'Teams']
    const params = helpers.testRequestParams('/sports/handball', { language: 'en' })

    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe.skip('football', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['counter', 'date', 'time', 'tournament', 'location', 'homeTeam', 'awayTeam']
    const params = helpers.testRequestParams('/sports/football', { language: 'en' })

    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

function testFootballLeague(leagueParams) {
  describe(`football/${leagueParams}`, () => {
    it('should return an array of objects containing correct fields', (done) => {
      const fieldsToCheckFor = ['counter', 'date', 'time', 'teams', 'location', 'scores']
      const params = helpers.testRequestParams(`/sports/football/${leagueParams}`, { language: 'en' })

      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })
}

testFootballLeague('male-leagues/borgun')
testFootballLeague('male-leagues/pepsi')
testFootballLeague('male-leagues/1st')
testFootballLeague('male-leagues/2nd')
testFootballLeague('male-leagues/3rd')

testFootballLeague('female-leagues/borgun')
testFootballLeague('female-leagues/pepsi')
