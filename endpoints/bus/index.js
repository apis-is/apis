var request = require('request'),
	h = require('apis-helpers'),
	app = require('../../server');

app.post('/bus/search', function(req, res) {
	return res.status(404).json({error:"This api endpoint has been closed, because Bus.is changed it's markup."});
});
