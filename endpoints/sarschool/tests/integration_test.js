import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('sarschool', () => {
    // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = [
    'id', 'name', 'time_start', 'time_end', 'sar_members_only', 'host',
    'location', 'price_regular', 'price_members', 'link',
  ]

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/sarschool')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
