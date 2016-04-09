import request from 'request'
import helpers from '../../../lib/test_helpers'

describe('zip', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['street', 'house', 'zip', 'city', 'apartment', 'letter']
    const params = helpers.testRequestParams('/address', { address: 'laugavegur 26' })
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
