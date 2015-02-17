var fs = require('fs');
var express = require('express');
var app = module.exports = express();

var statuses = require('statuses');
var config = require('config');
var cors = require('cors');

app.set('port', config.get('port'));

/**
 * Redirect root to docs
 */
app.get('/', function(req, res) {
  res.redirect('//docs.apis.is/');
});

// In production, someone else does this (nginx|varnish|haproxy)
if (app.get('env') !== 'production') {
  /*
   * Super simple logging
   */
  app.use(function(req, res, next) {
    console.log('requested:', req.url);
    next();
  });

  /**
   * Cross-origin resource sharing
   */
  app.use(cors());
}

app.get('/status', function(req, res, next) {
  // TODO: call status of each `endpoints`, or redirect to status.apis.is
  next(404);
});

/**
 * Set up endpoints
 */
var endpoints = fs.readdirSync('./endpoints/')
  .map(function(path) {
    console.log('Setting up: ' + path);

    var endpoint = require('./endpoints/' + path);
    app.use('/' + path, endpoint);

    return endpoint;
  });

app.use(function(req, res, next) {
  next(404);
});

app.use(function(err, req, res, next) {
  var code;
  if (typeof err === 'number') {
    code = err;
    err = statuses[code] || 'Unknown error';
  } else {
    code = err.code || 500;
  }

  res.status(code).json({error: err.message || ""+err});
});

/**
 * Start the server
 */
if (!module.parent) {
  app.listen(process.env.PORT || config.get('port'), function () {
    console.log('Listening');
  });
}

module.exports = app;
