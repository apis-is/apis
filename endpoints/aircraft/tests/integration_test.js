/* eslint-disable import/extensions */
const assert = require('assert')
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe('aircraft', () => {
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
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
  it('should return a 404 when an aircraft is not found', (done) => {
    const params = helpers.testRequestParams('/aircraft', { search: 'loftur' })
    request.get(params, (error, response) => {
      if (error) {
        return done(error)
      }
      // const json = JSON.parse(body)
      // assert.equal(json.error, 'No aircraft found with the query loftur')
      assert.strictEqual(response.statusCode, 404, `Invalid status code. Actual: ${response.statusCode}. Expected: 404`)
      done()
    })
  })
  it('should return a 400 when a search parameter is not provided', (done) => {
    const params = helpers.testRequestParams('/aircraft')
    request.get(params, (error, response) => {
      if (error) {
        return done(error)
      }
      // const json = JSON.parse(body)
      // assert.equal(json.error, 'Please provide a valid search string to lookup')
      assert.equal(response.statusCode, 400, `Invalid status code. Actual: ${response.statusCode}. Expected: 400`)
      done()
    })
  })
})
