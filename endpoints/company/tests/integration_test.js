import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe.skip('company', () => {
  const fieldsToCheckFor = ['name', 'sn', 'active', 'address']

  describe('searching by name', () => {
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/company', { name: 'hagar' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })
  describe('searching by address', () => {
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/company', { address: 'Hagasmára' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })
  describe('search by socialnumber', () => {
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/company', { socialnumber: '4307003590' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })
  describe('search by vsknr', () => {
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/company', { vsknr: '78874' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })
})
