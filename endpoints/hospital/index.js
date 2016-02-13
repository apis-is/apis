var request = require('request');
var app = require('../../server');
var cheerio = require('cheerio');
var _ = require('underscore');

app.get('/hospital', function(req, res){
  request.get({ url: 'http://www.landspitali.is/' }, function(err, response, body) {
    if(err || response.statusCode !== 200)
      return res.status(500).json({error: 'www.landspitali.is refuses to respond or give back data'});

    var $;
    try {
        $ = cheerio.load( body );
    } catch (e) {
    	return res.status(500).json({ error: 'An error occured when parsing the data from landspitali.is' });
    }

    var data = {};
    _.each($('.activityNumbers.activityNumbersNew').children('div'), function(elem) {
	data[elem.attribs.class] = parseInt($(elem).children().eq(1).html());
    });
    return res.cache(3600).json({ results: [data] });	// Cache for a hour.
  });
});
