const Redis = require('redis')
const debug = require('debug')('redis')

const redis = Redis.createClient()

redis.on('error', (error) => {
  debug(error)
})

module.exports = redis
