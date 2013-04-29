/**
 * The server module
 */
var restify = require('restify'),
    server = restify.createServer();

//Enables the use of posted params
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());

server.on('uncaughtException', function (req, res, route, err) {
    console.log(err.stack);
    res.send(new restify.InternalError(err, 'Internal error in endpoint, please let us know.'));
    return (true);
});
/**
 * Endpoints setup
 */
require('./lib/endpoints.js').load(server);

/**
 * Start the server
 */
server.listen(3100);
console.log('Server running at port: 3100');