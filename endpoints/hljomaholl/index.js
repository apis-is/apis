var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var app = require('../../server');

app.get('/hljomaholl', function(req, res, next) {
  var url = 'http://www.hljomaholl.is/vidburdir';

  request.get(url, function(error, response, body) {

    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        error:'www.hljomaholl.is refuses to respond or give back data'
      });
    }

    try {
      var $ = cheerio.load(body);
    } catch (error) {
      return res.status(500).json({error:'Could not parse body'});
    }

    var obj = {results: []};
    var fields = [
      'date', 'time', 'image', 'title', 'description', 'location',
      'buyTicketURL', 'moreInfoURL'
    ];

    try {
      $('.main-content-body ul').find('li').each(function(key) {

        var event = {};

        var counter = 0;
        $('.time', this).find('time').each(function(key1) {

          if (counter === 2) {
            return false;
          }

          var val = $(this).text();
          event[fields[key1]] = val;
          counter++;
        });
        event[fields[2]] = $('img', this).attr('src');
        event[fields[3]] = $('.time h1', this).text().trim();
        event[fields[4]] = $('p', this).text().trim();
        event[fields[5]] = $('.time h2', this).text().trim();
        event[fields[6]] = $('.btn-wrapper', this)
          .find('.btn-green').attr('href') || false;
        event[fields[7]] = (
          'http://www.hljomaholl.is' +
          $('.btn-wrapper', this).find('.btn-blue').attr('href')
        );

        obj.results.push(event);
      });
    } catch (error) {
      return res.status(500).json({error: 'Could not parse event data'});
    }

    return res.json(obj);

  });
});
