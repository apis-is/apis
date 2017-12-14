/* eslint-disable import/extensions */
const fs = require('fs')
const nock = require('nock')
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe('earthquake/is', () => {
  before(() => {
    nock('http://hraun.vedur.is')
      .get('/ja/skjalftar/skjlisti.html')
      .reply(200, fs.readFileSync(`${__dirname}/test.fixture`))
  })
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
  before(() => {
    nock('http://hraun.vedur.is')
      .get('/ja/skjalftar/skjlisti.html')
      .reply(200, fs.readFileSync(`${__dirname}/test.fixture`))
  })

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
