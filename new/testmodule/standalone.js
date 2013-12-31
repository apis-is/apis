var apis = require('../../server.js').standalone(), //This would be the apis module
	testmodule = require('./');

testmodule.setup(apis);