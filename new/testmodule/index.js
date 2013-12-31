exports.setup = function (apis) {
	console.log('Running endpoint setup');

	var app = apis.appMock(); //We only expose some part of the express app


	app.get('/test', function (req, res) {
		res.json({
			worked: true
		});
	});

	app.post('/test2', function (req, res) {
		res.json({
			worked: true
		});
	});

	apis.done(app);
}

exports.tests = './tests/test.js';
exports.docs = './docs/docs.js';