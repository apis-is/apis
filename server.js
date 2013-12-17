var express = require('express'),
    app = module.exports = express(),
	config = require('./config'),
    fileModule = require('file'),
    cache = require('./lib/cache'),
    cors = require('./lib/cors'),
    EE = require('events').EventEmitter;

/**
 * Set the spacing to 0 for shorter output
 */
app.set('json spaces', 0);

/**
 * Create an event listener for app
 */
EE.call(app);

/*
 * Built in parser to acces the body values
 */
app.use(express.bodyParser());

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
    if (endpoints && dirPath.indexOf("/test") < 0) endpoints.forEach( requireEndpoint );

    function requireEndpoint (endpoint) {
        if (endpoint.indexOf('.DS_Store') === -1) require('./' + dirPath + '/' + endpoint);
    }
});

/**
 * Start the server
 */
app.listen(config.port,function() {
    app.emit('ready');
});

app.on('ready',function() {
    if (!config.testing) console.log('Server running at port: ' + config.port);
});