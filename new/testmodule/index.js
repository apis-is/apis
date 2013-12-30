var apis = require('../../server.js'),
	app = apis.appMock, //We only expose some part of the express app
	name = require('./package.json').name;

app.get('/test', function (req, res) {
	res.json({
		worked: true
	});
});

module.exports = {
	name: name,
	tests: './tests/test.js',
	endpoint: app,
	docs: './docs/docs.js'
}