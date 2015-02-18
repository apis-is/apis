var fs = require('fs');
var express = require('express');
var app = module.exports = express();

var statuses = require('statuses');
var config = require('config');
var cors = require('cors');

var endpoints = fs.readdirSync(__dirname + '/endpoints/');

app.set('port', config.get('port'));

var uptime = new Date().getTime();
app.get('/uptime', function(req, res) {
  res.json({
    uptime: (new Date().getTime() - uptime) / 1000
  });
});

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

app.get('/docs.json', (function() {
  console.log('Building /docs.json');
  var endpoint;
  var docs = endpoints.map(function(name) {
    try {
      endpoint = require('./endpoints/' + name + '/docs');
    } catch (e) {
      console.error(' - Error loading docs for /%s: %s', name, e);
      endpoint = {nodocs: true, endpoints:[]};
    }

    endpoint.id = name;
    endpoint.endpoints = endpoint.endpoints.map(function(subendpoint) {
      subendpoint.path = '/' + name + subendpoint.path;
      return subendpoint;
    });

    return endpoint;
  });

  // clear memory
  endpoint = undefined;

  return function(req, res) {
    res.json(docs);
  };
})());

/**
 * Set up endpoints
 */
endpoints.forEach(function(path) {
    console.log('Setting up:', path);

    var endpoint = require('./endpoints/' + path);
    app.use('/' + path, endpoint);
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
  var port = process.env.PORT || config.get('port');
  app.listen(port, function () {
    console.log('Listening on port',port);
  });
}

module.exports = app;
