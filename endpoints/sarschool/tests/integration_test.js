/* eslint-disable import/extensions */
const fs = require('fs')
const nock = require('nock')
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe('sarschool', () => {
  before(() => {
    nock('http://skoli.landsbjorg.is')
      .get('/Open/Seminars.aspx?')
      .reply(200, fs.readFileSync(`${__dirname}/test.fixture`))
  })

  // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = [
    'id', 'name', 'time_start', 'time_end', 'sar_members_only', 'host',
    'location', 'price_regular', 'price_members', 'link',
  ]

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/sarschool')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
