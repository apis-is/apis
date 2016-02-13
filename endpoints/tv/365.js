var request = require('request'),
    parseString = require('xml2js').parseString,
    h = require('apis-helpers'),
    app = require('../../server');

/* Stod 2 */
app.get('/tv/stod2', function (req, res) {
  var url = 'http://stod2.is/XML--dagskrar-feed/XML-Stod-2-dagurinn';

  request.get({
    headers: {'User-Agent': h.browser()},
    url: url
  }, function (error, response, body) {
    if (error) throw new Error(url + ' did not respond');

    parseFeed(function (data) {
      res.cache(1800).json({
        results: data
      });
    }, body);
  });
});

/* Stod 2 Sport*/
app.get('/tv/stod2sport', function (req, res) {
  var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Sport-dagurinn';

  request.get({
    headers: {'User-Agent': h.browser()},
    url: url
  }, function (error, response, body) {
    if (error) throw new Error(url + ' did not respond');

    parseFeed(function (data) {
      res.cache(1800).json({
        results: data
      });
    }, body);
  });
});

/* Stod 2 Sport 2*/
app.get('/tv/stod2sport2', function (req, res) {
  var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Sport-2-dagurinn';

  request.get({
    headers: {'User-Agent': h.browser()},
    url: url
  }, function (error, response, body) {
    if (error) throw new Error(url + ' did not respond');

    parseFeed(function (data) {
      res.cache(1800).json({
        results: data
      });
    }, body);
  });
});

/* Stod 3*/
app.get('/tv/stod3', function (req, res) {
  var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-3-dagurinn';

  request.get({
    headers: {'User-Agent': h.browser()},
    url: url
  }, function (error, response, body) {
    if (error) throw new Error(url + ' did not respond');

    parseFeed(function (data) {
      res.cache(1800).json({
        results: data
      });
    }, body);
  });
});

/* Stod 2 Bio */
app.get('/tv/stod2bio', function (req, res) {
  var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Bio-dagurinn';

  request.get({
    headers: {'User-Agent': h.browser()},
    url: url
  }, function (error, response, body) {
    if (error) throw new Error(url + ' did not respond');

    parseFeed(function (data) {
      res.cache(1800).json({
        results: data
      });
    }, body);
  });
});

/* Stod 2 Gull */
app.get('/tv/stod2gull', function (req, res) {
  var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Extra-dagurinn';

  request.get({
    headers: {'User-Agent': h.browser()},
    url: url
  }, function (error, response, body) {
    if (error) throw new Error(url + ' did not respond');

    parseFeed(function (data) {
      res.cache(1800).json({
        results: data
      });
    }, body);
  });
});

/* Parse feeds from 365 midlar */
var parseFeed = function (callback, data) {
  parseString(data, function (err, result, title) {
    if (err) throw new Error('Parsing of XML failed. Title '+title);

    var schedule = [];

    for (var i = 0; i < result.schedule.event.length; ++i) {
      var event = result.schedule.event[i];

      schedule.push({
        title: event.title[0],
        originalTitle: event.org_title[0],
        duration: event.$.duration,
        description: event.description[0],
        live: event.live[0].$.value == 'true' ? true : false,
        premier: event.premier[0].$.value == 'true' ? true : false,
        startTime: event.$.starttime,
        aspectRatio: event.aspectratio[0].$.value,
        series: {
          episode: event.series ? event.series[0].$.episode : '',
          series: event.series ? event.series[0].$.series : ''
        }
      });
    }
    return callback(schedule);
  });
};
