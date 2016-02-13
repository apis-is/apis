var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var app = require('../../server');

app.get('/concerts', function (req, res, next) {
  var url = 'http://midi.is/Home/LoadMoreEventsByDate?eventType=Concerts&pageNumber='
  var page = req.query.page || 1;

  request.get(url + page, function (error, response, body) {
  	if (error || response.statusCode !== 200) {
		return res.status(500).json({ error: 'Something came up when contacting the midi.is server!'});
	}
	var events = JSON.parse(body);
	var filtered = _.map(events, function(event) {
		return _.pick(event, "eventDateName", "name", "dateOfShow",
			"userGroupName", "eventHallName", "imageSource")
	});
	return res.json({ results: filtered });
  });
});
