var redisRequire = require('redis');
const debug = require('debug')('redis');

var redis = redisRequire.createClient();

redis.on('error',function(error){
  debug(error);
})

module.exports = redis;
