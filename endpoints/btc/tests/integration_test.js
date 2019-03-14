/* eslint-disable no-bitwise */
/* eslint-disable import/first */
/* eslint-disable import/extensions */
const assert = require('assert')
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')


describe('btc', function () {
  this.timeout(20000)
  const rateTypes = {
    id: String,
    symbol: String,
    currencySymbol: String,
    rateUsd: Number,
    rateIsk: Number,
    rateIskFriendly: String
  }
  const statsFields = Object.keys(rateTypes)
  it('should return object containing specific fields with correct types', (done) => {
    const params = helpers.testRequestParams('/btc')
    request.get(params, (err, res, body) => {
      if (err) throw err
      let json
      try {
        json = JSON.parse(body)
      } catch (e) {
        throw e
      }
      helpers.assertPresenceOfFields(statsFields, [json])
      helpers.assertTypesOfFields(rateTypes, [json])
      done()
    })
  })
})
