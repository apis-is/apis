var _ = require('underscore');
var env = process.env.NODE_ENV ? process.env.NODE_ENV + '.config' : 'dev.config';
var defaultConfig = require('./default.json');
var envConfig = {};

if (process.env.INTEGRATION){
  env = 'integration';
}

try {
  envConfig = require('./' + env + '.json');
} catch (e) {
  console.log(e.code == 'MODULE_NOT_FOUND' ? 'Please create a dev.config.json file in the config folder' : e);
}

module.exports = _.extend(defaultConfig, envConfig);