import request from 'request'
import helpers from '../../../lib/test_helpers.js'

describe('car', () => {
  it('should return an array of objects containing correct fields', (done) => {
    const fieldsToCheckFor = [
      'registryNumber',
      'number',
      'factoryNumber',
      'type',
      'subType',
      'color',
      'registeredAt',
      'status',
      'nextCheck',
      'pollution',
      'weight',
    ]
    const params = helpers.testRequestParams('/car', { carPlate: 'AA031' })
    const resultHandler = helpers.testRequestHandlerForFields(done, fieldsToCheckFor)
    request.get(params, resultHandler)
  })
})
