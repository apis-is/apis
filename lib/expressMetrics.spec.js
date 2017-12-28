const sinon = require('sinon')
const expect = require('expect')
const redis = require('./redis')
const metricsMiddleware = require('./expressMetrics')

describe('Metrics Middleware', () => {
  let redisSpy = null

  beforeEach(() => {
    redisSpy = sinon.spy(redis, 'hincrby')
  })

  afterEach(() => {
    redis.hincrby.restore()
  })

  it('should record how often a endpoint is called', () => {
    // Call the middleware directly threee times
    metricsMiddleware()({ path: '/car?carPlate=foo' }, null, () => {})
    metricsMiddleware()({ path: '/car?carPlate=bar' }, null, () => {})
    metricsMiddleware()({ path: '/car?carPlate=baz' }, null, () => {})

    expect(redisSpy.callCount).toBe(3)
  })

  it('should not record how often a endpoint if it\'s /metrics', () => {
    metricsMiddleware()({ path: '/metrics' }, null, () => {})

    expect(redisSpy.callCount).toBe(0)
  })
})
