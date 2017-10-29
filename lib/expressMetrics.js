const redis = require('./redis')

module.exports = function () {
  return function (req, res, next) {
    if (req.path !== '/metrics') {
      redis.hincrby('metrics', `${req.path}.${req.method}.callCount`, 1)
    }
    next()
  }
}
