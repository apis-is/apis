/* eslint-disable prefer-destructuring */
// TODO: Find a way to enable no-param-reassign
/* eslint-disable no-param-reassign */
const debug = require('debug')('cache')
const redis = require('./redis')

module.exports = function () {
  return function (req, res, next) {
    if (process.env.NODE_ENV !== 'production' || !redis.connected) {
      res.cache = function () {
        return this
      }
      return next()
    }

    const end = res.end
    const write = res.write
    const chunkCache = []
    const key = req.originalUrl

    redis.get(key, (error, reply) => {
      if (error) {
        debug('Error in caching layer:', error)
        return next()
      }

      if (reply) {
        debug('cache HIT for %s', key)
        res.type('json')
        res.send(reply)
      } else {
        debug('cache MISS for %s', key)
        res.cache = function (timeout = 21600) {
          debug('will cache response of %s for %d seconds', key, timeout)

          res.write = function (chunk, encoding) {
            chunkCache.push(chunk)
            write.call(res, chunk, encoding)
          }

          res.end = function (chunk, encoding) {
            if (chunk) {
              this.write(chunk, encoding)
            }

            redis.setex(key, timeout, chunkCache.join(''))
            end.call(res)
          }
          return this
        }
        return next()
      }
    })
  }
}
