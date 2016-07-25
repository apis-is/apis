import request from 'request'
import helpers from '../../../lib/test_helpers'
import assert from 'assert'

describe('zip', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['street', 'house', 'zip', 'city', 'apartment', 'letter']
    const params = helpers.testRequestParams('/address', { address: 'laugavegur 26' })
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})

describe('address graphql', () => {
  it('should return only the field that were asked for', (done) => {
    const expected = {
      data: {
        address: [
          { street: 'laugavegur', house: '1' },
        ],
      },
    }
    const params = helpers.testRequestParams('/graphql', { query: `
      query {
        address(address: "laugavegur 1") {
          street
          house
        }
      }
    ` })
    request.get(params, (err, res, body) => {
      assert(body === JSON.stringify(expected), 'result will match expected')
      done()
    })
  })
})
