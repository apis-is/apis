/* eslint-disable import/extensions */
const fs = require('fs')
const nock = require('nock')
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe('isboltinn', () => {
  it('Should return an array of objects with fixed amount of fields.', (done) => {
    before(() => {
      nock('http://fotbolti.net')
        .get('/isboltinn.php')
        .reply(200, fs.readFileSync(`${__dirname}/test.fixture`))
    })
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
