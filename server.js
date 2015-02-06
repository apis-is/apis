var express = require('express');
var app = module.exports = express();

var config = require('./config');
var fileModule = require('file');
var cache = require('./lib/cache');
var cors = require('./lib/cors');
var EE = require('events').EventEmitter;

/**
 * Set the spacing to 0 for shorter output
 */
app.set('json spaces', 0);

/**
 * Create an event listener for app
 */
EE.call(app);

/**
 * Cross-origin resource sharing
 */
app.use(cors());

/**
 * Caching layer
 */
app.use(cache());

/**
 * Set up endpoints
 */
fileModule.walkSync('./endpoints', function iterateEndpoints(dirPath, dirs, endpoints) {
    if (endpoints && dirPath.indexOf('/test') < 0) endpoints.forEach(requireEndpoint);

    function requireEndpoint(endpoint) {
        if (endpoint.indexOf('.DS_Store') === -1) require('./' + dirPath + '/' + endpoint);
    }
});

/**
 * Start the server
 */
app.listen(config.port, function () {
    app.emit('ready');
});

app.on('ready', function () {
    if (!config.testing) console.log('Server running at port:', config.port);
});
