// TODO: Find a way to enable no-param-reassign
/* eslint-disable no-param-reassign */
import makeDebug from 'debug'

import config from '../config'
import redis from './redis'

const debug = makeDebug('cache')

module.exports = function cache() {
  return function (req, res, next) {
    if (config.testing || !redis.connected) {
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
      } else if (reply) {
        res.type('json')
        res.send(reply)
      } else {
        res.cache = function (timeout = 21600) {
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
