exports.setup = function(server){
	server.post({path: '/bus/search', version: '1.0.0'}, search); //Old
	server.get({path: '/bus/search', version: '1.0.0'}, search);
}

var search = function(req, res, next) {
	res.json(404,{error:"This api endpoint has been closed temporarily, because Bus.is changed it's markup."});
	return next();
}