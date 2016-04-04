import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('concerts', () => {
  const fieldsToCheckFor = [
    'eventDateName', 'name', 'dateOfShow', 'userGroupName', 'eventHallName',
    'imageSource',
  ]
  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/concerts')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
