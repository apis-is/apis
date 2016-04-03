import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe.skip('lotto', () => {
    // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = ['date', 'lotto', 'joker', 'prize', 'link']

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/lottery')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
describe.skip('lotto', () => {
    // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = ['date', 'lotto', 'joker', 'prize', 'link']

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/lottery/lotto')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
describe.skip('vikingalotto', () => {
    // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = ['date', 'lotto', 'joker', 'prize', 'link']

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/lottery/vikingalotto')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
describe.skip('eurojackpot', () => {
    // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = ['date', 'lotto', 'joker', 'prize', 'link']

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/lottery/eurojackpot')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
