exports.setup = function(){
	server.post({path: '/help_out', version: '1.0.0'}, function(req, res, next){
		res.json(200,{message:'Send us mail: apis@apis.is ,thanks for your interest!'});
	});
}