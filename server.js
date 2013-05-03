//The server module
var restify = require('restify'),
    server = restify.createServer();

//Enables the use of posted params
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());

//If an exception gets thrown we catch it here and send 500 error back to the user
server.on('uncaughtException', function (req, res, route, err) {
    console.log(err.stack);
    res.send(new restify.InternalError(err, 'Internal error in endpoint, please let us know.'));
    return (true);
});

//Add a header to every endpoint so the api can be accessed by json and set the right charset
server.pre(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.charSet = 'utf8';
	return next();
});

//Endpoints setup
require('./lib/endpoints.js').load(server);

//Start the listener for incoming connections
server.listen(3100);
console.log('Server running at port: 3100');