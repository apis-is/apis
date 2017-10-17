/* eslint-disable import/extensions */
const assert = require('assert')
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe('ship', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = [
      'name',
      'type',
      'registrationNumber',
      'regionalCode',
      'homePort',
      'registrationStatus',
      'grossRegisterTonnage',
      'grossTonnage',
      'length',
      'buildYear',
      'buildYard',
      'owners',
    ]
    const params = helpers.testRequestParams('/ship', { search: 'helga maría' })
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
  it('should return a 404 when a ship is not found', (done) => {
    const params = helpers.testRequestParams('/ship', { search: 'koddsson' })
    request.get(params, (error, response, body) => {
      if (error) {
        return done(error)
      }
      const json = JSON.parse(body)
      assert.equal(json.error, 'No ship found with the query koddsson')
      done()
    })
  })
})
