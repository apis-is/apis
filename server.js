var express = require('express'),
    config = require('./config'),
    app = express(),
    once = require('once');

function createMock(prefix) {
    prefix = '/' + prefix;

    var cb = function (res, err, result) {
        if (err) return res.json({
            success: false,
            error: err
        });

        res.json(result);
    };

    var mock = {
        get: function (path, fn) {
            app.get(prefix + path, function (req, res) {
                //If this function is called more than once we
                //have to bubble up error
                fn(req, once(cb.bind(this, res)));
            });
        }
    };

    return mock;
}

var endpoints = {
    //Prefix : Location
    'example': './new/testmodule'
};

Object.keys(endpoints).forEach(function (endpoint) {
    var mock = createMock(endpoint);

    require(endpoints[endpoint]).setup(mock);
});

app.listen(config.port);