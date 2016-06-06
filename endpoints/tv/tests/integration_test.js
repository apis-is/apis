import request from 'request'
import helpers from '../../../lib/test_helpers'

describe('tv root', () => {
  it('should return info', (done) => {
    const fieldsToCheckFor = ['info']
    const params = helpers.testRequestParams('/tv/')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe.skip('tv - skjar1', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['series', 'title', 'originalTitle', 'description', 'live', 'premier']
    const params = helpers.testRequestParams('/tv/skjar1')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe.skip('tv - stod2 gull', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['series', 'title', 'originalTitle', 'description', 'live', 'premier']
    const params = helpers.testRequestParams('/tv/stod2gull')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe('tv - stod2 bio', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['series', 'title', 'originalTitle', 'description', 'live', 'premier']
    const params = helpers.testRequestParams('/tv/stod2bio')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe('tv - stod3', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['series', 'title', 'originalTitle', 'description', 'live', 'premier']
    const params = helpers.testRequestParams('/tv/stod3')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe.skip('tv - stod2 sport2', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['series', 'title', 'originalTitle', 'description', 'live', 'premier']
    const params = helpers.testRequestParams('/tv/stod2sport2')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe('tv - stod2 sport', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['series', 'title', 'originalTitle', 'description', 'live', 'premier']
    const params = helpers.testRequestParams('/tv/stod2sport')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe('tv - stod2', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['series', 'title', 'originalTitle', 'description', 'live', 'premier']
    const params = helpers.testRequestParams('/tv/stod2')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe.skip('tv - ruv ithrottir', function () {
  it('should return an array of objects containing correct fields', (done) => {
    this.timeout(20000)
    const fieldsToCheckFor = ['series', 'title', 'originalTitle', 'description', 'live', 'premier']
    const params = helpers.testRequestParams('/tv/ruvithrottir')
    const resultHandler = helpers.testRequestHandlerForFields(
      done, fieldsToCheckFor, undefined, true
    )
    request.get(params, resultHandler)
  })
})

describe.skip('tv - ruv', function () {
  it('should return an array of objects containing correct fields', (done) => {
    this.timeout(20000)
    const fieldsToCheckFor = ['series', 'title', 'originalTitle', 'description', 'live', 'premier']
    const params = helpers.testRequestParams('/tv/ruv')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
