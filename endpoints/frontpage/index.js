exports.setup = function(){
	server.get({path: '/'}, getSlash);
	server.post({path: '/'}, postSlash);
}

getSlash = function(req, res, next) {
	// fs.readFile('public/index.html', 'utf8', function (err,data) {
	// 	if (err) {
	// 		h.logError(err,err.stack);
	// 		res.json(200,{success:'failure',message:"Something went wrong"});
	// 		return next();
	// 	}
	// 	res.charSet = 'utf8';
	// 	res.writeHead(200, {
	// 		'Content-Length': Buffer.byteLength(data),
	// 		'Content-Type': 'text/html;charset=utf8',
	// 	});
	// 	res.write(data);
	// 	res.end();

	// 	return next();
	// });
	res.header('Location', 'http://docs.apis.is');
    res.send(302);
    return next(false);
}

postSlash = function(req, res, next) {
	res.json(200,{"info":"Velkominn á apis.is! Kíktu á docs.apis.is í vafranum þínum fyrir frekari upplýsingar!"});
	return next();
}