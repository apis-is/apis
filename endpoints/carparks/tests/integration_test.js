/* eslint-disable import/extensions */
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe('carparks', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['name', 'address', 'openingHours', 'parkingSpaces', 'coordinates']
    const params = helpers.testRequestParams('/carparks')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
