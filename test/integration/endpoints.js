var fs = require('fs');
var fileModule = require('file');
var testDir = '/tests';
var testFileName = 'integration_test.js';

describe('endpoint', function() {
	fileModule.walkSync('./endpoints', function(dirPath, dirs, files){
        if (dirPath.indexOf(testDir) < 0) return;
        files.forEach(function(file){
            if (file != testFileName) return;
            var path = dirPath + '/' + file;
            if (!fs.existsSync(path)) return;
            require('../../' + path);
        });
	});
});


