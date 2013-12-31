console.log('Running test endpoint setup');

var apis = require('../../server'),
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


//If we are going to run this module as a standalone server
//we have to run the setup function
if (module.parent) {
	apis.done(app);
} else {
	apis.done(app, 'standalone');
}

exports.tests = './tests/test.js';
exports.docs = './docs/docs.js';