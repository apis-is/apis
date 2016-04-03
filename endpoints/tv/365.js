var request = require('request')
var parseString = require('xml2js').parseString
var h = require('apis-helpers')
var app = require('../../server')

/* Stod 2 */
app.get('/tv/stod2', function (req, res, next) {
  var url = 'http://stod2.is/XML--dagskrar-feed/XML-Stod-2-dagurinn'
  serve(url, res, next)
})

/* Stod 2 Sport*/
app.get('/tv/stod2sport', function (req, res, next) {
  var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Sport-dagurinn'
  serve(url, res, next)
})

/* Stod 2 Sport 2*/
app.get('/tv/stod2sport2', function (req, res, next) {
  var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Sport-2-dagurinn'
  serve(url, res, next)
})

/* Stod 3*/
app.get('/tv/stod3', function (req, res, next) {
  var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-3-dagurinn'
  serve(url, res, next)
})

/* Stod 2 Bio */
app.get('/tv/stod2bio', function (req, res, next) {
  var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Bio-dagurinn'
  serve(url, res, next)
})

/* Stod 2 Gull */
app.get('/tv/stod2gull', function (req, res, next) {
  var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Extra-dagurinn'
  serve(url, res, next)
})

var serve = function (url, res, next) {
  getFeed(url, function (err, data) {
    if (err) {
      console.error(err)
      return next(502)
    }

    res.cache(1800).json({
      results: data
    })
  })
}

var getFeed = function (url, callback) {
  request.get({
    headers: { 'User-Agent': h.browser() },
    url: url
  }, function (error, response, body) {
    if (error) return callback(new Error(url + ' did not respond'))

    parseFeed(callback, body)
  })
}

/* Parse feeds from 365 midlar */
var parseFeed = function (callback, data) {
  parseString(data, function (err, result, title) {
    if (err) return callback(new Error('Parsing of XML failed. Title ' + title))

    var schedule = []

    for (var i = 0; i < result.schedule.event.length; ++i) {
      var event = result.schedule.event[i]

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
      })
    }
    return callback(null, schedule)
  })
}
