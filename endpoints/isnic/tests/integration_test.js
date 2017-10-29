/* eslint-disable import/extensions */
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe.skip('isnic', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = [
      'domain',
      'registrantname',
      'address',
      'city',
      'postalCode',
      'country',
      'phone',
      'email',
      'registered',
      'expires',
      'lastChange',
    ]
    const params = helpers.testRequestParams('/isnic', { domain: 'apis.is' })
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
