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

app.on('ready', function () {
    if (!config.testing) console.log('Server running at port: ' + config.port);
});

function Mock(type) {
    this.routes = [];
}

Mock.prototype.addRoute = function (type, args) {
    var route = {
        type: type,
        args: args
    };

    this.routes.push(route)

    console.log('Route added', route);
}

Mock.prototype.get = function () {
    this.addRoute('get', Array.prototype.slice.call(arguments))
}

Mock.prototype.post = function () {
    this.addRoute('post', Array.prototype.slice.call(arguments))
}

Mock.prototype.setup = function () {
    this.routes.forEach(function (endpoint) {
        //Pass the arguments onto the app
        app[endpoint.type].apply(app, endpoint.args);
    });

    app.listen(config.port, function () {
        app.emit('ready');
    });
}

if (!module.parent) {
    config.endpoints.forEach(function (endpoint) {
        require(endpoint).app.routes.forEach(function (endpoint) {
            //Pass the arguments onto the app
            app[endpoint.type].apply(app, endpoint.args);
        });
    });

    app.listen(config.port, function () {
        app.emit('ready');
    });
}

module.exports = function (standalone) {
    return new Mock;
}