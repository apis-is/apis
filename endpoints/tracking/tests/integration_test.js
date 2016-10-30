import request from 'request'
import assert from 'assert'

describe('tracking', () => {
  it('should return a 404 when the tracking number can\'t be found', (done) => {
    request.get('http://localhost:3101/tracking/derp', (error, response) => {
      assert.equal(404, response.statusCode)

      done()
    })
  })
})
