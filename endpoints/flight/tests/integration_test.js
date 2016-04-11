import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('flight', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['date', 'flightNumber', 'airline', 'to', 'plannedArrival', 'realArrival', 'status']
    const params = helpers.testRequestParams('/flight', {
      language: 'en',
      type: 'departures',
    })
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
