const request = require('request')
const helpers = require('../../../lib/test_helpers')

describe('/cinema', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['title', 'released', 'restricted', 'imdb', 'imdbLink', 'image', 'showtimes']
    const params = helpers.testRequestParams('/cinema')
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
describe('cinema theaters', () => { })
