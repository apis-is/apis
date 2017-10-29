/* eslint-disable import/extensions */
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe.skip('isboltinn', () => {
  it('Should return an array of objects with fixed amount of fields.', (done) => {
    const fields = [
      'place', 'team', 'gamesPlayed',
      'gamesWon', 'gamesDraw', 'gamesLost',
      'goals', 'goalDifference', 'points',
    ]

    const params = helpers.testRequestParams('/isbolti', {})
    const resultHandler = helpers.testRequestHandlerForFields(done, fields)
    request.get(params, resultHandler)
  })
})
