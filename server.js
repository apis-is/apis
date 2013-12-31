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

function setupServerListener() {
    app.listen(config.port, function () {
        app.emit('ready');
    });

    app.on('ready', function () {
        if (!config.testing) console.log('Server running at port: ' + config.port);
    });
}



function appMock() {
    return new(function () {
        return {
            routes: [], //Holds all routes exported by the endpoint
            addRoute: function (type, args) {
                var route = {
                    type: type,
                    args: args
                };

                this.routes.push(route)

                console.log('Route added', route);
            },
            get: function () {
                this.addRoute('get', Array.prototype.slice.call(arguments))
            },
            post: function () {
                this.addRoute('post', Array.prototype.slice.call(arguments))
            },
            put: function () {
                this.addRoute('put', Array.prototype.slice.call(arguments))
            },
            delete: function () {
                this.addRoute('delete', Array.prototype.slice.call(arguments))
            }
        }
    })()

}

// config.endpoints.forEach(function (endpoint) {

// });

module.exports = {
    standalone: function () {
        console.log('Executing standalone apis server')

        config.standalone = true;

        return {
            done: function (endpointData) {
                endpointData.routes.forEach(function (endpoint) {
                    //Pass the arguments onto the app
                    app[endpoint.type].apply(app, endpoint.args);
                });

                setupServerListener();
            },
            appMock: appMock
        }
    },
    setup: function () {
        return new function () {
            this.appMock = appMock;
            this.done = function (endpointData) {
                endpointData.routes.forEach(function (endpoint) {
                    //Pass the arguments onto the app
                    app[endpoint.type].apply(app, endpoint.args);
                });
            }

            var self = this;
            config.endpoints.forEach(function (endpoint) {
                require(endpoint).setup(self);
            });

            setupServerListener();

        }

    }
}