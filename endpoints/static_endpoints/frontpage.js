exports.setup = function(){
	server.get({path: '/'}, getFrontpage);
	server.post({path: '/'}, postFrontpage);
}

getFrontpage = function(req, res, next) {
	res.header('Location', 'http://docs.apis.is');
    res.send(302);
    return next(false);
}

postFrontpage = function(req, res, next) {
	var obj = {
			    "info": {
			        "english": "Hey there! Check out docs.apis.is in your browser for mor info",
			        "icelandic": "Velkominn á apis.is! Kíktu á docs.apis.is í vafranum þínum fyrir frekari upplýsingar!"
			    }
			};

	res.json(200,obj);
	return next();
}