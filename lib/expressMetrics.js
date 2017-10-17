const redis = require('./redis')

const metricsPrefix = 'metrics-'

module.exports = {
  metricsPrefix,
  metricsMiddleware() {
    return function (req, res, next) {
      const path = req.path
      if (path !== '/metrics') {
        redis.incr(`metrics-${req.path}.callCount`)
      }
      next()
    }
  },
}
