import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('particulates', () => {
    // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = ['PM10nuna', 'PM10medaltal', 'Counter', 'Dags', 'nanariuppl']

  it.skip('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/particulates')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
