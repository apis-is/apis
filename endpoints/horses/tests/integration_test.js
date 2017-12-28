/* eslint-disable import/extensions */
const fs = require('fs')
const assert = require('assert')
const nock = require('nock')
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
  before(() => {
    nock('http://www.worldfengur.com')
      .post('/freezone_horse.jsp', 'fnr=&nafn=Oddur&uppruni=Selfossi&ormerki=&leitahnappur=Search+&leita=1')
      .query({ c: 'EN' })
      .reply(200, fs.readFileSync(`${__dirname}/oddur.fixture`))
      .post('/freezone_horse.jsp', 'fnr=&nafn=F%E1lki&uppruni=Geirshl%ED%F0&ormerki=&leitahnappur=Search+&leita=1')
      .query({ c: 'EN' })
      .reply(200, fs.readFileSync(`${__dirname}/falki.fixture`))
      .post('/freezone_horse.jsp', 'fnr=&nafn=Lotta&uppruni=%C1rm%F3ti&ormerki=&leitahnappur=Search+&leita=1')
      .query({ c: 'EN' })
      .reply(200, fs.readFileSync(`${__dirname}/lotta.fixture`))
      .post('/freezone_horse.jsp', 'fnr=IS2013182797&nafn=&uppruni=&ormerki=&leitahnappur=Search+&leita=1')
      .query({ c: 'EN' })
      .times(2)
      .reply(200, fs.readFileSync(`${__dirname}/IS2013182797.fixture`))
      .post('/freezone_horse.jsp', 'fnr=IS1987187700&nafn=&uppruni=&ormerki=&leitahnappur=Search+&leita=1')
      .query({ c: 'EN' })
      .times(3)
      .reply(200, fs.readFileSync(`${__dirname}/IS1987187700.fixture`))
  })

  describe('multi-results', function () {
    this.timeout(20000)
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/horses', { name: 'Oddur', origin: 'Selfossi' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })

  describe('single-result-by-name', function () {
    this.timeout(20000)
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/horses', { name: 'Fálki', origin: 'Geirshlíð' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })

  describe('single-result-partial-info', function () {
    this.timeout(20000)
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/horses', { name: 'Lotta', origin: 'Ármóti' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })

  describe('single-result-by-id', function () {
    this.timeout(20000)
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/horses', { id: 'IS1987187700' })
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })

    it('should return an array of objects containing the correct color', (done) => {
      const params = helpers.testRequestParams('/horses', { id: 'IS1987187700' })
      request.get(params, (error, response, body) => {
        const json = JSON.parse(body)
        const results = json.results[0]
        assert(results.color === 'Palomino with a star flaxen mane and tail')
        done()
      })
    })
  })
})
