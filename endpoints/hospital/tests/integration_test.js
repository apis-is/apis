import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('hospital', () => {
    // The only thing that changes is the form attribute, so why not just re-use the object
  const fieldsToCheckFor = [
    'birthNumbers', 'surgeries', 'dischargedNumbers', 'hospitalizedNumbers', 'atwork', 'patients-child',
    'patients-er', 'patients-walk', 'patients-icu', 'donors', 'patients-skilun', 'patients-heart2',
  ]

  it('should return an array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/hospital')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request(params, resultHandler)
  })
})
