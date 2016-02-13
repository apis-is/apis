var request = require('request');
var h = require('apis-helpers');
var app = require('../../server');

app.post('/bus/search', function(req, res) {
	return res.json(404,{error:"This api endpoint has been closed, because Bus.is changed it's markup."});
});
