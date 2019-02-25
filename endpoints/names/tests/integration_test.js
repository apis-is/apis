/* eslint-disable import/extensions */
/*
About:   Integration tests for the Names API
Author:  Hjörtur Líndal Stefánsson
Email:   hjorturls@gmail.com
Created: August 2014
*/

const assert = require('assert')
const request = require('request')
const helpers = require('../../../lib/test_helpers.js')

// Asserts the results
const assertResults = (params, beEmpty) => {
  const shouldBeEmpty = beEmpty || false
  request.get(params, (err, res, body) => {
    const json = JSON.parse(body)

    assert(json.results && typeof json.results.length !== 'undefined', 'Does not contain a \'results\' field')
    if (!shouldBeEmpty) {
      assert(json.results.length > 0, 'Results are empty')
    } else {
      assert(json.results.length === 0, 'Results are NOT empty')
    }
  })
}

// Test the unfiltered list of names
const testUnfiltered = (url) => {
  it('should return an array of strings', (done) => {
    const params = helpers.testRequestParams(url, {})
    assertResults(params)
    done()
  })
}

// Test filtering with a string that should return no results
const testFilteredEmpty = (url) => {
  it('should return an empty array', (done) => {
    const params = helpers.testRequestParams(url, { search: '234asdf' })
    assertResults(params, true)
    done()
  })
}

// Test filtering the results with a valid filter
const testFiltered = (url) => {
  it('should return an array of strings', (done) => {
    const params = helpers.testRequestParams(url, { search: 'an' })
    assertResults(params)
    done()
  })
}

// Test the endpoint
const testEndpoint = (name, url) => {
  // without filtering
  describe(`${name}`, () => testUnfiltered(url))
  // with filtering that should return empty array as a results
  describe(`${name}-filtered-invalid`, () => testFilteredEmpty(url))
  // with filtering
  describe(`${name}-filtered`, () => testFiltered(url))
}

describe('names', () => {
  testEndpoint('names', '/names')
  testEndpoint('males', '/names/males')
  testEndpoint('females', '/names/females')
  testEndpoint('middlenames', '/names/middlenames')
  testEndpoint('rejected-names', '/names/rejected/')
  testEndpoint('rejected-males', '/names/rejected/males')
  testEndpoint('rejected-females', '/names/rejected/females')
  testEndpoint('rejected-middlenames', '/names/rejected/middlenames')
})
