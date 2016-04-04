/*
About:   Integration tests for the Names API
Author:  Hjörtur Líndal Stefánsson
Email:   hjorturls@gmail.com
Created: August 2014
*/

import request from 'request'
import assert from 'assert'
import helpers from '../../../lib/test_helpers.js'

/* Asserts the results */
function assertResults(params, beEmpty) {
  const shouldBeEmpty = beEmpty || false
  request.get(params, (err, res, body) => {
    const json = JSON.parse(body)

    assert(json.results && typeof json.results.length !== 'undefined', "Does not contain a 'results' field")
    if (!shouldBeEmpty) {
      assert(json.results.length > 0, 'Results are empty')
    } else {
      assert(json.results.length <= 0, 'Results are NOT empty')
    }
  })
}

/* Test the unfiltered list of names */
function testUnfiltered(url) {
  it('should return an array of strings', (done) => {
    const params = helpers.testRequestParams(url, {})

    assertResults(params)
    done()
  })
}

/* Test filtering with an invalid string */
function testFilteredEmpty(url) {
  it('should return an array of strings', (done) => {
    const params = helpers.testRequestParams(url, { search: '234asdf' })

    assertResults(params, true)
    done()
  })
}

/* Test filtering the results with a valid filter */
function testFiltered(url) {
  it('should return an array of strings', (done) => {
    const params = helpers.testRequestParams(url, { search: 'an' })

    assertResults(params)
    done()
  })
}

/* Test the /names/males endpoint with filtering */
describe('males-filtered', () => {
  testFiltered('/names/males')
})

/* Test the /names/males endpoint with invalid filtering */
describe('males-filtered-invalid', () => {
  testFilteredEmpty('/names/males')
})

/* Test the /names/males endpoint without filtering */
describe('males', () => {
  testUnfiltered('/names/males')
})

/* Test the /names/females endpoint with filtering */
describe('females-filtered', () => {
  testFiltered('/names/females')
})

/* Test the /names/females endpoint with invalid filtering */
describe('females-filtered-invalid', () => {
  testFilteredEmpty('/names/males')
})

/* Test the /names/females endpoint without filtering */
describe('females', () => {
  testUnfiltered('/names/females')
})

/* Test the /names/middlenames endpoint with filtering */
describe('middlenames-filtered', () => {
  testFiltered('/names/middlenames')
})

/* Test the /names/middlenames endpoint with invalid filtering */
describe('middlenames-filtered-invalid', () => {
  testFilteredEmpty('/names/middlenames')
})

/* Test the /names/middlenames endpoint without filtering */
describe('middlenames', () => {
  testUnfiltered('/names/middlenames')
})

/* Test the /names/rejected/males endpoint with filtering */
describe('rejected-males-filtered', () => {
  testFiltered('/names/rejected/males')
})

/* Test the /names/rejected/males endpoint with invalid filtering */
describe('rejected-males-filtered-invalid', () => {
  testFilteredEmpty('/names/rejected/males')
})

/* Test the /names/rejected/males endpoint without filtering */
describe('rejected-males', () => {
  testUnfiltered('/names/rejected/males')
})

/* Test the /names/rejected/females endpoint with filtering */
describe('rejected-females-filtered', () => {
  testFiltered('/names/rejected/females')
})

/* Test the /names/rejected/females endpoint with invalid filtering */
describe('rejected-females-filtered-invalid', () => {
  testFilteredEmpty('/names/rejected/females')
})

/* Test the /names/rejected/females endpoint without filtering */
describe('rejected-females', () => {
  testUnfiltered('/names/rejected/females')
})

/* Test the /names/rejected/middlenames endpoint with filtering */
describe('rejected-middlenames-filtered', () => {
  testFiltered('/names/rejected/middlenames')
})

/* Test the /names/rejected/middlenames endpoint with invalid filtering */
describe('rejected-middlenames-filtered-invalid', () => {
  testFilteredEmpty('/names/rejected/middlenames')
})

/* Test the /names/rejected/middlenames endpoint without filtering */
describe('rejected-middlenames', () => {
  testUnfiltered('/names/rejected/middlenames')
})
