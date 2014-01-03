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

module.exports = {
	tests: './tests/test.js',
	docs: './docs/docs.js',
	app: !! module.parent ? app : app.setup()
}