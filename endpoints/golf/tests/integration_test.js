import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('golf', () => {
  // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = ['abbreviation', 'club', 'location']

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/golf/clubs')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})

describe('golf', () => {
  // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = ['time', 'name', 'club', 'handicap']

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/golf/teetimes', { club: 61 })
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
