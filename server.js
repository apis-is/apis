/**
 * Global npm modules
 */
var restify = require('restify'),
    server = restify.createServer();

//Enables the use of posted params
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());

/**
 * Endpoints setup
 */
require('./lib/endpoints.js').load(server);

/**
 * Start the server
 */
server.listen(3100);
console.log('Server running at port: 3100');