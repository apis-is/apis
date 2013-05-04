//The server module
var restify = require('restify'),
    server = restify.createServer(),
<<<<<<< HEAD
    util = require('util');
=======
    config = require('./config');
>>>>>>> 72965207e20f39a0a450178c3d169e4d7a22e639

//Enables the use of posted params
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());

//If an exception gets thrown we catch it here and send 500 error back to the user
server.on('uncaughtException', function (req, res, route, err) {
    console.log("======== Uncaught exception =========");
    console.log("In: ", req.url, req.method);
    if (Object.keys(req.params).length > 0) {
        console.log("Params: ", util.inspect(req.params).replace(/\n/g,''));
    }
    console.log("Headers: ", util.inspect(req.headers).replace(/\n/g,''));
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
server.listen(config.port);
console.log('Server running at port: ' + config.port);
