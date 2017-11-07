/* eslint-disable import/extensions */
const fs = require('fs')
const nock = require('nock')
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

describe('currency', () => {
  // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = ['shortName', 'longName', 'value', 'askValue', 'bidValue', 'changeCur', 'changePer']

  describe('searching using provider "m5"', () => {
    before(() => {
      nock('http://www.m5.is')
        .get('/')
        .query({ gluggi: 'gjaldmidlar' })
        .reply(200, fs.readFileSync(`${__dirname}/test.fixture`))
    })

    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/currency/m5')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request(params, resultHandler)
    })
  })

  describe('searching using provider "arion"', () => {
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/currency/arion')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request(params, resultHandler)
    })
  })

  describe('searching using provider "lb"', () => {
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/currency/lb')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request(params, resultHandler)
    })
  })

  describe('searching using provider "borgun"', () => {
    it('should return an array of objects containing correct fields', (done) => {
      const params = helpers.testRequestParams('/currency/borgun')
      const fields = [
        'currencyCode',
        'currencyDescription',
        'currencyRate',
        'country',
        'countryEnglish',
        'countryCode',
        'rateDate',
      ]
      const resultHandler = helpers.testRequestHandlerForFields(done, fields)
      request(params, resultHandler)
    })
  })
})
