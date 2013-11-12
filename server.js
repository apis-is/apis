var express = require('express'),
    app = module.exports = express(),
    config = require('./config'),
    fileModule = require('file'),
    cache = require('./lib/cache'),
    cors = require('./lib/cors'),
    EE = require('events').EventEmitter;

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
fileModule.walkSync('./endpoints', function (dirPath, dirs, files) {
    if (files && dirPath.indexOf('/test') < 0) {
        files.forEach(function (file, key) {
            require('./' + dirPath + '/' + file);
        });
    }
});

/**
 * Start the server
 */
app.listen(config.port, function () {
    app.emit('ready');
});

app.on('ready', function () {
    if (!config.testing) {
        console.log('Server running at port: ' + config.port);
    }
});
