/* eslint-disable import/extensions */
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe.skip('earthquake/is', () => {
  // Which fields we expect and of which type they should be
  const fieldsToCheckFor = {
    timestamp: Date,
    latitude: Number,
    longitude: Number,
    depth: Number,
    size: Number,
    quality: Number,
    humanReadableLocation: String,
  }

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/earthquake/is')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})

describe.skip('earthquake/is/sec', () => {
  // Which fields we expect and of which type they should be
  const fieldsToCheckFor = {
    timestamp: Date,
    latitude: Number,
    longitude: Number,
    depth: Number,
    size: Number,
    quality: Number,
    humanReadableLocation: String,
  }

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/earthquake/is')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
