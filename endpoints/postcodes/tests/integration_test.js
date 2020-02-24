const request = require('request')
const helpers = require('../../../lib/test_helpers')

describe('postcodes', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['postCode', 'city']
    const params = helpers.testRequestParams('/postcodes')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe('concerts', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['postCode', 'city']
    const params = helpers.testRequestParams('/postcodes')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
