var express = require('express'),
    app = express(),
    config = require('./config'),
    once = require('once'),
    dive = require('dive'),
    cors = require('express-simple-cors'),
    cache = require('express-cache');

/**
 * Set the spacing to 0 for shorter output
 */
app.set('json spaces', 0);

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
app.use(cache({
    testMode: true
}));

function createMock(prefix) {
    prefix = '/' + prefix;

    var cb = function (wrapper, error, result) {
        var res = wrapper.res;
        if (error) {

            if (typeof error === 'string') {
                return res.json(500, {
                    success: false,
                    error: error
                });
            } else {
                return res.json(error.code || 500, {
                    success: false,
                    error: error.message
                });
            }
        }

        res.cache(wrapper.ttl).json(result);
    };

    var mock = {
        get: function (path, ttl, fn) {
            if (typeof ttl === 'function') {
                fn = ttl;
                ttl = 0;
            }

            app.get(prefix + path, function (req, res) {
                //If this function is called more than once we  
                //have to bubble up error
                fn(req, once(cb.bind(this, {
                    res: res,
                    ttl: ttl
                })));
            })
        }
    };

    return mock;
}

['car', 'flight', 'firm'].forEach(function (endpoint) {
    var mock = createMock(endpoint);

    require('./endpoints/' + endpoint)(mock)
});

app.listen(config.port);