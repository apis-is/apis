var xtend = require('xtend'),
    env = process.env.NODE_ENV || 'dev',
    defaultConfig = require('./default.json'),
    envConfig = require('./' + env + '.config.json');

module.exports = xtend({}, defaultConfig, envConfig);
