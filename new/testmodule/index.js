console.log('Running test endpoint setup');

var app = require('../../server')();

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

exports.tests = './tests/test.js';
exports.docs = './docs/docs.js';
exports.app = !! module.parent ? app : app.setup();