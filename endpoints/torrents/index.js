var app = require('../../server');

// get the json from kjarni.cc, list courtesy of Gunnar Guðvarðs
app.get('/torrents', function (req, res, next) {
	
	// this is a beta url, ill update it when it changes
	var url = 'http://home.kjarni.cc:3001/torrents.json';

	request(url, function (error, response, body) {
		return response;
	}

}
