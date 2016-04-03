import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('earthquake/is', () => {
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

describe('earthquake/is/sec', () => {
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
