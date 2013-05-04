var xtend = require('xtend'),
    env = process.env.NODE_ENV || 'dev',
    defaultConfig = require('./default.json'),
    envConfig = {};

try{
	envConfig = require('./' + env + '.config.json');
}catch(e){
	console.log(e.code = 'MODULE_NOT_FOUND' ? 'Please create a dev.config.json file in the config folder' : e);
}

module.exports = xtend({}, defaultConfig, envConfig);