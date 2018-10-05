const request = require('request')
const helpers = require('../../../lib/test_helpers')

describe('stadfang/', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = ['address', 'zipCode', 'streetNf', 'streetThf', 'houseNumber', 'houseLetter', 'landNumber', 'coordinates']
    const params = helpers.testRequestParams('/stadfang', { address: 'laugavegur 26' })
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
