const Redis = require('redis')
const makeDebug = require('debug')

const debug = makeDebug('redis')

const redis = Redis.createClient()

redis.on('error', (error) => {
  debug(error)
})

module.exports = redis
