exports.setup = function (app) {
	app.get('/my-route/:id', function (req, callback) {
		myRoute(req.params.id, callback);
	});
};

var myRoute = exports.myRoute = function (id, callback) {
	console.log('Given ID was:', id);

	setTimeout(callback.bind(null, {
		message: 'This came from successfull callback'
	}), 500);

	setTimeout(callback.bind(null, {
		message: 'This came from repeated successfull callback'
	}), 700);

}