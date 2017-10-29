/* eslint-disable import/extensions */
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

const fieldsToCheckFor = [
  'id',
  'name_and_origin',
  'ueln', 'date_of_birth',
  'color_code',
  'color',
  'country_located',
  'fate',
  'microchip',
  'father',
  'mother',
]

describe('horses', () => {
  describe.skip('multi-results', function () {
    this.timeout(20000)
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/horses', { name: 'Oddur', origin: 'Selfossi' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })

  describe.skip('single-result-by-name', function () {
    this.timeout(20000)
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/horses', { name: 'Fálki', origin: 'Geirshlíð' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })

  describe.skip('single-result-partial-info', function () {
    this.timeout(20000)
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/horses', { name: 'Lotta', origin: 'Ármóti' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })

  describe.skip('single-result-by-id', function () {
    this.timeout(20000)
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/horses', { id: 'IS1987187700' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })
})
