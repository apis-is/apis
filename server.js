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


//Here we have to hijack the current stuff that is sent to the function
//e.g. req,res,next and convert it into something like platform
app.use(function (req, res, next) {
    //console.log(next.toString())

    next()
})

function setupServerListener() {
    app.listen(config.port, function () {
        app.emit('ready');
    });

    app.on('ready', function () {
        if (!config.testing) console.log('Server running at port: ' + config.port);
    });
}

function Mock() {
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

Mock.prototype.put = function () {
    this.addRoute('put', Array.prototype.slice.call(arguments))
}

Mock.prototype.delete = function () {
    this.addRoute('delete', Array.prototype.slice.call(arguments))
}

var shared = module.exports = {
    appMock: function () {
        return new Mock;
    },
    done: function (endpointData, type) {

        endpointData.routes.forEach(function (endpoint) {
            //Pass the arguments onto the app
            app[endpoint.type].apply(app, endpoint.args);
        });

        if (type === 'standalone') {
            setupServerListener();
        }
    },
    setup: function () {
        config.endpoints.forEach(function (endpoint) {
            require(endpoint);
        });

        setupServerListener();
    }
}

//If we are loading this from the command line then we have to
//run the setup function
if (!module.parent) {
    shared.setup()
}