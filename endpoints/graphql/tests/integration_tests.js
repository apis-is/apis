import request from 'request'
import helpers from '../../../lib/test_helpers'
import expect from 'expect'

describe('graphql/ endpoint', () => {
  it('should be able to compose fields from multiple data sources', (done) => {
    const expected = {
      data: {
        address: [{ street: 'laugavegur', house: '1' }],
        holidays: [{ description: 'Þjóðhátíðardagur Íslendinga' }],
      },
    }
    const params = helpers.testRequestParams('/graphql', { query: `
      query {
        address(address: "laugavegur 1") {
          street,
          house
        },
        holidays(year: "2016", month: "06", day: "17") {
          description
        }
      }
    ` })
    request.get(params, (err, res, body) => {
      expect(JSON.parse(body)).toEqual(expected)
      done()
    })
  })
})
