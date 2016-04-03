import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('cyclecounter', () => {
    // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = ['DayCount', 'YearCount', 'Time', 'Date']

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/cyclecounter')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
