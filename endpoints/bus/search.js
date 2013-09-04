app.post({path: '/bus/search', version: '1.0.0'}, function(req,res){
	res.inactive(error: 'This api endpoint has been closed temporarily, because Bus.is changed it's markup.');
}); //Old
app.get({path: '/bus/search', version: '1.0.0'}, function(req,res){
	res.inactive(error: 'This api endpoint has been closed temporarily, because Bus.is changed it's markup.');
});

var search = function(req, res, next) {
	res.json(404,{error:"This api endpoint has been closed temporarily, because Bus.is changed it's markup."});
	return next();
}