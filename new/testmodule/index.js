exports.setup = function (type) {
	console.log('Running endpoint setup');

	var apis = require('../../server');
	app = apis.appMock(); //We only expose some part of the express app


	app.get('/test', function (req, res) {
		res.json({
			worked: true
		});
	});

	app.post('/test2', function (req, res) {
		res.json({
			worked2: true
		});
	});

	apis.done(app, type);
}

exports.tests = './tests/test.js';
exports.docs = './docs/docs.js';