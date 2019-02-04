/* eslint-disable import/extensions */
const fs = require('fs')
const assert = require('assert')
const nock = require('nock')
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe('aircraft', () => {
  before(() => {
    nock('http://www.samgongustofa.is/flug/loftfor/loftfaraskra')
      .get('/')
      .query({ aq: '100' })
      .reply(200, fs.readFileSync(`${__dirname}/loftfaraskra.fixture`))
  })

  describe('correct-fields', () => {
    this.timeout(20000)
    it('should return an array of objects containing correct fields', (done) => {
      const fieldsToCheckFor = [
        'id',
        'registrationNumber',
        'type',
        'buildYear',
        'serialNumber',
        'maxWeight',
        'passengers',
        'owner',
        'operator',
      ]
      const params = helpers.testRequestParams('/aircraft', { search: '100' })
      console.info(params)
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })

  describe('aircraft-not-found', () => {
    this.timeout(20000)
    it('should return a 404 when an aircraft is not found', (done) => {
      const params = helpers.testRequestParams('/aircraft', { search: 'loftur' })
      request.get(params, (error, response, body) => {
        if (error) {
          return done(error)
        }
        const json = JSON.parse(body)
        console.info(json)
        assert.strictEqual(json.error, 'No aircraft found with the query loftur')
        done()
      })
    })

    this.timeout(20000)
    it('should return a 400 when a search parameter is not provided', (done) => {
      const params = helpers.testRequestParams('/aircraft')
      request.get(params, (error, response, body) => {
        if (error) {
          return done(error)
        }
        const json = JSON.parse(body)
        assert.strictEqual(json.error, 'Please provide a valid search string to lookup')
        done()
      })
    })
  })
})
