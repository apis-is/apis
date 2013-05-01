/**
 * Loads upp all the required endpoints
 */
exports.load = function(server){
	var fileModule = require('file');

	//Load all endpoints in the endpoints folder
 	//walk is blocking on purpose because the server is not allowed 
 	//to listen yet
	fileModule.walkSync('./endpoints', function(dirPath, dirs, files){
		if(files && dirPath.indexOf("/test") < 0){
			files.forEach(function(file,key){
				//Setup the endpoint via the setup function
				require('../'+dirPath+'/'+file).setup(server);
			});
		}
	});
}
