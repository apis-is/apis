var apis = require('../../server.js'), //This would be the apis module
	testmodule = require('./');

apis.standalone(testmodule);