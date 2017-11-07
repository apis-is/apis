const request = require('request')
const assert = require('assert')
const nock = require('nock')

describe.only('tracking', () => {
  const trackingNumber = 'TRACKING_NUMBER'
  before(() => {
    const path = '/einstaklingar/senda-pakka-innanlands/finna-sendingu/' +
      `?TrackingNumber=${trackingNumber}&Language=IS`
    const scope = nock('http://www.postur.is')
      .get(path)
      .reply(200, 'domain matched')
    //const secondScope = nock('http://localhost:3101')
    //  .get(`/tracking/${trackingNumber}`)
    //  .reply(200, 'domain matched')
  })

  it('should return a 404 when the tracking number can\'t be found', (done) => {
    request.get(`http://localhost:3101/tracking/${trackingNumber}`, (error, response) => {
      console.log(error)
      console.log(response)
      assert.equal(404, response.statusCode)

      done()
    })
  })
})
