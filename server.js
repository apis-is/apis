var restify = require('restify'),
	server = restify.createServer();

//Enables the use of posted params
server.use(restify.bodyParser({ mapParams: true })); 


/**
 * Global npm modules
 */
exports.scraper = scraper = require('scraper');
exports.request = request = require('request');
exports.fs = fs = require('fs');
exports.$ = $ = require('jquery');
exports.moment = moment = require('moment');

/**
 * Global helpers
 */
exports.h = h = require('./lib/helpers.js');
exports.e = e = require('./lib/errors.js');

/**
 * Endpoints files
 */
try{
	var frontpage = require('./endpoints/frontpage.js'),
		bus = require('./endpoints/bus.js'),
		phone = require('./endpoints/phone.js'),
		phone2 = require('./endpoints/phone2.js'),
		sms = require('./endpoints/sms.js'),
		currency = require('./endpoints/currency.js'),
		company = require('./endpoints/company.js'),
		word = require('./endpoints/word.js'),
		flight = require('./endpoints/flight.js'),
		car = require('./endpoints/car.js'),
		house = require('./endpoints/houses.js');
}catch(e){
	console.log('An endpoint is missing:');
	console.log(e);
}



try{
	/**
	 * Endpoints setup
	 */

	/**
	 * The frontpage
	 */
	server.get({path: '/'}, frontpage.getSlash);
	server.post({path: '/'}, frontpage.postSlash);

	/**
	 * Bus endpoint
	 */
	server.post({path: '/bus/search', version: '1.0.0'}, bus.search);
	server.post({path: '/bus/realtime', version: '1.0.0'}, bus.realtime);

	/**
	 * Phone endpoint
	 * Depricated
	 */
	//server.post({path: '/phone', version: '1.0.0'}, phone.search);
	//server.post({path: '/phone', version: '2.0.0'}, phone.search2); //v2

	server.post({path: '/phone', version: '1.0.0'}, function(req, res, next){
		res.json(410,{error:"This api endpoint has been closed and it will not be available again."});
		return next();
	});

	server.post({path: '/phone', version: '2.0.0'}, function(req, res, next){
		res.json(410,{error:"This api endpoint has been closed and it will not be available again."});
		return next();
	});


	/**
	 * Sms endpoint
	 */
	server.post({path: '/sms', version: '1.0.0'}, sms.slash);

	/**
	 * Currency endpoint
	 */
	server.post({path: '/currency', version: '1.0.0'}, currency.slash);

	/**
	 * Company endpoint
	 */
	server.post({path: '/company', version: '1.0.0'}, company.slash);

	/**
	 * Car endpoint
	 */
	server.post({path: '/car', version: '1.0.0'}, car.slash);

	/**
	 * Flight endpoint
	 */
	server.post({path: '/flight', version: '1.0.0'}, flight.slash);
	server.post({path: '/help_out', version: '1.0.0'}, function(req, res, next){
		res.json(200,{message:'Send us mail: apis@apis.is ,thanks for your interest!'});
	});

	/**
	 * Incomplete endpoints
	 */

	/**
	 * House endpoint
	 */
	server.post({path: '/house', version: '1.0.0'}, house.slash);

	/**
	 * Word endpoint
	 */
	server.post({path: '/word', version: '1.0.0'}, word.slash);

}catch(e){
	console.log("An endpoint file is missing and therefore this endpoint can not be started:")
	console.log(e);
}


/**
 * Start the server
 */
server.listen(3100);