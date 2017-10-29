const redis = require('./redis')

const metricsPrefix = 'metrics-'

module.exports = {
  metricsPrefix,
  metricsMiddleware() {
    return function (req, res, next) {
      if (req.path !== '/metrics') {
        redis.incr(`metrics-${req.path}.${req.method}.callCount`)
      }
      next()
    }
  },
}
