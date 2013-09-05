var redisRequire = require('redis');

//Create the connection
var redis = redisRequire.createClient();

redis.on('error',function(error){
	console.log(error);
})

module.exports = redis;