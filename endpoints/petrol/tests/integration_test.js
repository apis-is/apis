import request from 'request'
import helpers from '../../../lib/test_helpers.js'

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

describe('get-petrol-stations', function () {
  this.timeout(20000)
  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/petrol')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
