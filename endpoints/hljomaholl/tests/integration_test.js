import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('hljomaholl', () => {
  // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = [
    'date', 'time', 'image', 'title', 'description', 'location', 'buyTicketURL', 'moreInfoURL',
  ]

  it('should return an array of items with correct fields', (done) => {
    const params = helpers.testRequestParams('/hljomaholl')
    const resultHandler = helpers.testRequestHandlerForFields(
      done, fieldsToCheckFor, null, true
    )
    request(params, resultHandler)
  })
})
