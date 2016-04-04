import request from 'request'
import assert from 'assert'
import helpers from '../../../lib/test_helpers'

describe('weather', () => {
  it('should return info', (done) => {
    const fieldsToCheckFor = ['info']
    const params = helpers.testRequestParams('/weather/')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })

  describe('getAvailableStations', () => {
    it('should return an array of objects containing correct fields', (done) => {
      const fieldsToCheckFor = ['name', 'id']
      const params = helpers.testRequestParams('/weather/getAvailableStations')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })
  })

  describe('forecasts', () => {
    it('should return an error', (done) => {
      const fieldsToCheckFor = ['error']
      const params = helpers.testRequestParams('/weather/forecasts/')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })

    it('should return an error', (done) => {
      const fieldsToCheckFor = ['error']
      const params = helpers.testRequestParams('/weather/forecasts/se?stations=1')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })

    it('should return an array of objects containing correct fields', (done) => {
      const fieldsToCheckFor = ['name', 'atime', 'link', 'forecast', 'id', 'valid']
      const params = helpers.testRequestParams('/weather/forecasts?stations=1')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, (json) => {
        const forecasts = json.results[0].forecast
        helpers.assertPresenceOfFields(['ftime', 'F', 'D', 'T', 'W'], forecasts)
      })
      request.get(params, resultHandler)
    })

    it('should return an array of objects containing correct fields and descriptions', (done) => {
      const fieldsToCheckFor = ['name', 'atime', 'link', 'forecast', 'id', 'valid']
      const params = helpers.testRequestParams('/weather/forecasts?stations=1&descriptions')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, (json) => {
        // helper function only works on arrays
        helpers.assertPresenceOfFields(['descriptions'], [json])
      })
      request.get(params, resultHandler)
    })

    it('should return an array with 1 result', (done) => {
      const params = helpers.testRequestParams('/weather/forecasts?stations=1')
      request.get(params, (err, res, body) => {
        if (err) {
          throw err
        }
        let json
        try {
          json = JSON.parse(body)
        } catch (e) {
          throw e
        }
        assert.equal(1, json.results.length)
        done()
      })
    })

    it('should return an array with 2 results', (done) => {
      const params = helpers.testRequestParams('/weather/forecasts?stations=1,422')
      request.get(params, (err, res, body) => {
        if (err) {
          throw err
        }
        let json
        try {
          json = JSON.parse(body)
        } catch (e) {
          throw e
        }
        assert.equal(2, json.results.length)
        done()
      })
    })
  })

  describe('observations', () => {
    it('should return an error', (done) => {
      const fieldsToCheckFor = ['error']
      const params = helpers.testRequestParams('/weather/observations/')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })

    it('should return an error', (done) => {
      const fieldsToCheckFor = ['error']
      const params = helpers.testRequestParams('/weather/observations/fi?stations=1')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })

    it('should return an array of objects containing correct fields', (done) => {
      const fieldsToCheckFor = [
        'name', 'time', 'link', 'F', 'D', 'FX', 'FG', 'T', 'W', 'V', 'R', 'id', 'valid',
      ]
      const params = helpers.testRequestParams('/weather/observations?stations=1')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })

    it('should return an array of objects containing correct fields and descriptions', (done) => {
      const fieldsToCheckFor = [
        'name', 'time', 'link', 'F', 'D', 'FX', 'FG', 'T', 'W', 'V', 'R', 'id', 'valid',
      ]
      const params = helpers.testRequestParams('/weather/observations?stations=1&descriptions')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor, (json) => {
        // helper function only works on arrays
        helpers.assertPresenceOfFields(['descriptions'], [json])
      })
      request.get(params, resultHandler)
    })

    it('should return an array with 1 result', (done) => {
      const params = helpers.testRequestParams('/weather/observations?stations=1')

      request.get(params, (err, res, body) => {
        if (err) {
          throw err
        }
        let json
        try {
          json = JSON.parse(body)
        } catch (e) {
          throw e
        }
        assert.equal(1, json.results.length)
        done()
      })
    })

    it('should return an array with 2 results', (done) => {
      const params = helpers.testRequestParams('/weather/observations?stations=1,422')
      request.get(params, (err, res, body) => {
        if (err) {
          throw err
        }
        let json
        try {
          json = JSON.parse(body)
        } catch (e) {
          throw e
        }
        assert.equal(2, json.results.length)
        done()
      })
    })
  })

  describe('texts', () => {
    it('should return an error', (done) => {
      const fieldsToCheckFor = ['error']
      const params = helpers.testRequestParams('/weather/texts/')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })

    it('should return an error', (done) => {
      const fieldsToCheckFor = ['error']
      const params = helpers.testRequestParams('/weather/texts/nk?types=5')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })

    it('should return an array of objects containing correct fields', (done) => {
      const fieldsToCheckFor = ['title', 'creation', 'valid_from', 'valid_to', 'content', 'id']
      const params = helpers.testRequestParams('/weather/texts?types=5')
      const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
      request.get(params, resultHandler)
    })

    it('should return an array with 1 result', (done) => {
      const params = helpers.testRequestParams('/weather/texts?types=5')
      request.get(params, (err, res, body) => {
        if (err) {
          throw err
        }
        let json
        try {
          json = JSON.parse(body)
        } catch (e) {
          throw e
        }
        assert.equal(1, json.results.length)
        done()
      })
    })

    it('should return an array with 2 results', (done) => {
      const params = helpers.testRequestParams('/weather/texts?types=5,6')
      request.get(params, (err, res, body) => {
        if (err) throw err
        let json
        try {
          json = JSON.parse(body)
        } catch (e) {
          throw e
        }
        assert.equal(2, json.results.length)
        done()
      })
    })
  })
})
