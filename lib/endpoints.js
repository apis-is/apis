var fileModule = require('file');
/**
 * Loads upp all the required endpoints
 */

exports.load = function(server){
	//Load all endpoints in the endpoints folder
 	//walk is blocking on purpose because the server can't listen yet
	fileModule.walk('./endpoints', function(a, dirPath, dirs, files){
		if(files){
			files.forEach(function(file,key){
				//Setup the endpoint via the setup function
				require('../'+file).setup(server);
			});
		}else{
			console.log('There is no endpoint to load!');
		}
	});
}
