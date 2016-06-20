import request from 'request'
import helpers from '../../../lib/test_helpers'

describe('calendar/:year', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['date', 'description', 'holiday']
    const params = helpers.testRequestParams('/calendar/2016')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe('calendar/:year/month', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['date', 'description', 'holiday']
    const params = helpers.testRequestParams('/calendar/2016/06')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe('calendar/:year/:month/:day', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['date', 'description', 'holiday']
    const params = helpers.testRequestParams('/calendar/2016/06/17')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
