/**
 * Global npm modules
 */
exports.restify = restify = require('restify');
exports.server = server = restify.createServer();

exports.scraper = scraper = require('scraper');
exports.request = request = require('request');
exports.fs = fs = require('fs');
exports.$ = $ = require('jquery');
exports.moment = moment = require('moment');
exports.file = fileModule = require('file');

/**
 * Global helpers
 */
exports.h = h = require('./lib/helpers.js');
exports.endpoints = endpoints = require('./lib/endpoints.js');


//Enables the use of posted params
server.use(restify.bodyParser({ mapParams: true }));

/**
 * Endpoints setup
 * Load all endpoints in the endpoints folder
 * walk is blocking on purpose because the server can't listen yet
 */
console.log('Registering endpoints:');
fileModule.walk('./endpoints', function(a, dirPath, dirs, files){
	if(files){
		files.forEach(function(file,key){
			var fileName = file.replace('/index.js','')
								.replace('.js','')
								.replace('endpoints/','')
								.replace('/','.'),
 				requiredData = require('./'+file);
 			endpoints.register(fileName,requiredData);
		})
	}
	
});

//Register endpoins that do not have file associated.
endpoints.register('phone',null);
endpoints.register('help_out',null);

/**
 * Start the server
 */
server.listen(3100);