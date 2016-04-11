import Redis from 'redis'
import makeDebug from 'debug'

const debug = makeDebug('redis')

const redis = Redis.createClient()

redis.on('error', (error) => {
  debug(error)
})

module.exports = redis
