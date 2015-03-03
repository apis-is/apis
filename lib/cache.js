var config = require('../config');
var redis = require('./redis');


module.exports = function(){
	return function(req,res,next){
	    if(config.testing || !redis.connected){
	        res.cache = function(){
	            return this;
	        }
	        return next();
	    }

	    var end = res.end,
	        write = res.write,
	        cache = [],
	        key = req.originalUrl;

	    redis.get(key,function(error,reply){
	        if(error){
	        	console.log('Error in caching layer:',error);
	        	return next();
	        }else if(reply){
	            res.type('json');
	            res.send(reply);
	        }else{
	            res.cache = function(timeout) {

	                if(typeof timeout === 'undefined')
	                    timeout = 21600; //Default timeout is 6 hours

	                console.log('INSIDE CACHE')
	                res.write = function(chunk, encoding){
	                    cache.push(chunk)
	                    write.call(res,chunk,encoding);
	                }

	                res.end = function(chunk, encoding){
	                    if(chunk) this.write(chunk,encoding);
	                    //console.log('Chunk norris:', chunk.toString())

	                    console.log('Expiration is :',timeout);

	                    redis.setex(key, timeout , cache.join(''));

	                    end.call(res);
	                };
	                return this;
	            };
	            return next();
	        }
	    })
	}
}