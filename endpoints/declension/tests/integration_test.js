import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('declension', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['predicate', 'value', 'category']
    const params = helpers.testRequestParams('/declension/laugavegur')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
