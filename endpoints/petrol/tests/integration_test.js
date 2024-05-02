/* eslint-disable import/extensions */
const request = require('../../../apis-test-request-bridge.js')
const helpers = require('../../../lib/test_helpers.js')

const fieldsToCheckFor = [
  'bensin95',
  'bensin95_discount',
  'company',
  'diesel',
  'diesel_discount',
  'geo',
  'key',
  'name',
]
jest.setTimeout(20000)

describe('get-petrol-stations', function () {
  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/petrol')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
