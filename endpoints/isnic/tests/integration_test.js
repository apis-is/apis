/* eslint-disable import/extensions */
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe('isnic', () => {
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
    const params = {
      url: 'http://localhost:3101/isnic',
      method: 'GET',
      qs: { domain: 'apis.is' },
      headers: ['Content-Type: application/json'],
    }
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
