var phone = function(req, res, next){
	res.json(410,{error:"This api endpoint has been closed and it will not be available in the foreseeable future."});
	return next();
}

exports.setup = function(server){
	server.post({path: '/phone', version: '1.0.0'}, phone);
	server.get({path: '/phone', version: '1.0.0'}, phone);
	server.post({path: '/phone', version: '2.0.0'}, phone);
	server.get({path: '/phone', version: '2.0.0'}, phone);
}
