var express = require('express'),
    app = express(),
    config = require('./config'),
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
//app.use(express.bodyParser());

/**
 * Cross-origin resource sharing
 */
app.use(cors());

/**
 * Caching layer
 */
app.use(cache());

function setup() {
    app.listen(config.port, function () {
        app.emit('ready');
    });

    app.on('ready', function () {
        if (!config.testing) console.log('Server running at port: ' + config.port);
    });
}

var endpoints = [];

function mock(type, args) {

    endpoints.push({
        type: type,
        args: args
    })

    console.log('ENDPOINTS', endpoints)
}

module.exports = {
    standalone: function (endpoint) {

        endpoints.forEach(function (endpoint) {
            //Pass the arguments onto the app
            app.get.apply(app, endpoint.args);
        });

        setup();
    },
    appMock: {
        get: function () {
            mock('get', Array.prototype.slice.call(arguments))
        },
        post: function () {
            mock('post', Array.prototype.slice.call(arguments))
        },
        put: function () {
            mock('put', Array.prototype.slice.call(arguments))
        },
        delete: function () {
            mock('delete', Array.prototype.slice.call(arguments))
        }
    }
}