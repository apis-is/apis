var express = require('express');
var app = module.exports = express();

var config = require('./config');
var fileModule = require('file');
var cache = require('./lib/cache');
var cors = require('./lib/cors');
var EE = require('events').EventEmitter;
var statuses = require('statuses');


/**
 * Set the spacing to 0 for shorter output
 */
app.set('json spaces', 0);

/**
 * Create an event listener for app
 */
EE.call(app);

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
    if (endpoints && dirPath.indexOf('test') < 0) endpoints.forEach(requireEndpoint);

    function requireEndpoint(endpoint) {
        if (endpoint.indexOf('.DS_Store') === -1) require('./' + dirPath + '/' + endpoint);
    }
});

app.use(function(error, req, res, next){
  var code = 500;
  var message = 'Unknown error';

  if (typeof error === 'number') {
    //next(404)
    code = error
    message = statuses[code] || message;
  }else if (typeof error === 'object' && error.message && error.message.length === 3 && !isNaN(error.message)) {
    //throw Error(404)
    code = parseInt(error.message,10);
    message = statuses[code] || message;

  }else if(typeof error === 'object' && !error.code){
    //throw Error('foo') or throw Error('404|foo')
    
    var pos = error.message.indexOf('|');

    if(!!~pos){
      code = error.message.slice(0,pos);
      message = error.message.slice(pos + 1,error.message.length);
    }else{
      message = error.message;
    }
  }else{
    message = error.message;
  }

  code = parseInt(code);

  if(res.headersSent){
    return console.error('Headers already sent');
  }
  
  res.status(code).json({error: message});
});

/**
 * Start the server
 */
app.listen(config.port, function () {
    app.emit('ready');
});

app.on('ready', function () {
    if (!config.testing) console.log('Server running at port:', config.port);
});
