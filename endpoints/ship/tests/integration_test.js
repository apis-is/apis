/* eslint-disable import/extensions */
import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('ship', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = [
      'name',
      'type',
      'registrationNumber',
      'regionalCode',
      'homePort',
      'registrationStatus',
      'grossRegisterTonnage',
      'grossTonnage',
      'length',
      'buildYear',
      'buildYard',
      'owners',
    ]
    const params = helpers.testRequestParams('/ship', { search: 'helga maría' })
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
