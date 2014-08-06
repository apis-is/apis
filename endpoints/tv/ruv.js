var request = require('request'),
    moment = require('moment'),
    parseString = require('xml2js').parseString,
    h = require('apis-helpers'),
    app = require('../../server');

/* RUV */
app.get('/tv/ruv', function (req, res) {
  var url = 'http://muninn.ruv.is/files/xml/ruv/';

  if (req.params.date) {
    if (moment(req.params.date).isValid()) {
      var date = moment(req.params.date);
      // Example : http://muninn.ruv.is/files/xml/ruv/2013-06-11/
      url += date.format('YYYY-MM-DD');
    }
  }

  request.get({
    headers: {'User-Agent': h.browser()},
    url: url
  }, function (error, response, body) {
    if (error) throw new Error(url + ' did not respond');

    parseFeed(function (data) {
      res.cache(1800).json(200, {
        results: data
      });
    }, body);
  });
});

/* RUV Ithrottir*/
app.get('/tv/ruvithrottir', function (req, res) {
  var url = 'http://muninn.ruv.is/files/xml/ruvithrottir/';

  request.get({
    headers: {'User-Agent': h.browser()},
    url: url
  }, function (error, response, body) {
    if (error) throw new Error(url + ' did not respond');

    parseFeed(function (data) {
      res.cache(1800).json(200, {
        results: data
      });
    }, body);
  });
});


/* Parse feeds from RUV */
var parseFeed = function (callback, data) {
  parseString(data, function (err, result, title) {
    if (err) throw new Error('Parsing of XML failed. Title '+title);

    var schedule = [];

    if (result.schedule.error || !result.schedule.service[0].hasOwnProperty('event')) {
      return(callback(schedule));
    }

    for (var i = 0; i < result.schedule.service[0].event.length; ++i) {
      var event = result.schedule.service[0].event[i];
      schedule.push({
        title: event.title[0],
        originalTitle: event['original-title'][0],
        duration: event.$.duration,
        description: event.description[0],
        shortDescription: event['short-description'][0],
        live: event.live[0] == 'yes' ? true : false,
        premier: event.rerun[0] == 'yes' ? false : true,
        startTime: event.$['start-time'],
        aspectRatio: event['aspect-ratio'][0].size[0],
        series: {
          episode: event.episode[0].$.number,
          series: event.episode[0].$['number-of-episodes']
        }
      });
    }
    return callback(schedule);
  });
};
