var fs = require('fs'),
  	path = require('path'),
	fileModule = require('file'),
	testDir = '/tests',
	testFileName = 'integration_test.js';

	
process.env.INTEGRATION = true;

describe('endpoint', function() {
	it('should load the server and set everything up properly',function(done){
		this.timeout(1000); //Server should not take more than 1 sek to boot

		var app = require(process.cwd() + '/server');

		app.on('ready',function(){
			fileModule.walkSync('./endpoints', function(dirPath, dirs, files){
		        if (dirPath.indexOf(testDir) < 0) return;
		        files.forEach(function(file){
		            if (file != testFileName) return;
		            var fullPath = dirPath + '/' + file;
		            if (!fs.existsSync(fullPath)) return;
                	    if (path.extname(fullPath) !== '.js') return;
		            require('../../' + fullPath);
		        });
			});
			done();
		});
	});
});
