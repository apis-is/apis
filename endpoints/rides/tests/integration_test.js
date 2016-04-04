import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('rides root', () => {
  it('should return info and endpoints', (done) => {
    const fieldsToCheckFor = ['info', 'endpoints']
    const params = helpers.testRequestParams('/rides/')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
});

['samferda-drivers', 'samferda-passengers'].forEach((api) => {
  const apiName = `rides - ${api}`
  describe(apiName, () => {
    const fieldsToCheckFor = ['link', 'from', 'to', 'date', 'time']
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams(`/rides/${api}`)
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })
})
