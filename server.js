import express from 'express';
import expressMetrics from 'express-metrics';

import fileModule from 'file';
import { EventEmitter as EE } from 'events';

import statuses from 'statuses';

import config from './config';
import cache from './lib/cache';
import cors from './lib/cors';

var app = express();

app.use(expressMetrics({
  port: 8091
}));

module.exports = app;

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
  if(res.headersSent) return console.error('Headers already sent');

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

  }else {
    //Other errors that might have been swallowed
    console.error(error);
    message = error.message;
  }

  code = parseInt(code);

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
