/* eslint-disable no-bitwise */
/* eslint-disable import/first */
/* eslint-disable import/extensions */
const fs = require('fs')
const request = require('request')
const nock = require('nock')
const helpers = require('../../../lib/test_helpers.js')

describe('btc', ()=> {
  const rateTypes = {
    id: String,
    symbol: String,
    currencySymbol: String,
    rateUsd: Number,
    rateIsk: Number,
    rateIskFriendly: String,
    timestamp: Number
  }
  const fieldsToCheckFor = Object.keys(rateTypes)

  before(() => {
    nock('https://myntkaup.is')
      .get('/api/assets/bitcoin')
      .reply(200, fs.readFileSync(`${__dirname}/myntkaup.fixture`))
  })

  it('should return object containing specific fields with correct types', (done) => {
    const params = helpers.testRequestParams('/btc')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
