exports.setup = function (app) {
	app.get('/my-route/:id', function (req, callback) {
		myRoute(req.params.id, callback);
	});
};

var myRoute = exports.myRoute = function (id, callback) {
	console.log('Given ID was:', id);

	setTimeout(function () {
		callback(new Error('FOOBAR HAPPENED ON BERGEN'))
	}, 500);

}