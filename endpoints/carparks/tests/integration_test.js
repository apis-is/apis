import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('carparks', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['name', 'address', 'parkingSpaces', 'coordinates']
    const params = helpers.testRequestParams('/carparks')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
