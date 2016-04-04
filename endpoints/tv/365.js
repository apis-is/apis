import request from 'request'
import xml2js from 'xml2js'
import h from 'apis-helpers'
import app from '../../server'

const parseString = xml2js.parseString

/* Parse feeds from 365 midlar */
const parseFeed = function (callback, data) {
  parseString(data, (err, result, title) => {
    if (err) return callback(new Error(`Parsing of XML failed. Title ${title}`))

    const schedule = []

    for (let i = 0; i < result.schedule.event.length; ++i) {
      const event = result.schedule.event[i]

      schedule.push({
        title: event.title[0],
        originalTitle: event.org_title[0],
        duration: event.$.duration,
        description: event.description[0],
        live: event.live[0].$.value === 'true',
        premier: event.premier[0].$.value === 'true',
        startTime: event.$.starttime,
        aspectRatio: event.aspectratio[0].$.value,
        series: {
          episode: event.series ? event.series[0].$.episode : '',
          series: event.series ? event.series[0].$.series : '',
        },
      })
    }
    return callback(null, schedule)
  })
}

const getFeed = function (url, callback) {
  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  }, (error, response, body) => {
    if (error) return callback(new Error(`${url} did not respond`))

    parseFeed(callback, body)
  })
}

const serve = function (url, res, next) {
  getFeed(url, (err, data) => {
    if (err) {
      console.error(err)
      return next(502)
    }

    res.cache(1800).json({
      results: data,
    })
  })
}

/* Stod 2 */
app.get('/tv/stod2', (req, res, next) => {
  const url = 'http://stod2.is/XML--dagskrar-feed/XML-Stod-2-dagurinn'
  serve(url, res, next)
})

/* Stod 2 Sport*/
app.get('/tv/stod2sport', (req, res, next) => {
  const url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Sport-dagurinn'
  serve(url, res, next)
})

/* Stod 2 Sport 2*/
app.get('/tv/stod2sport2', (req, res, next) => {
  const url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Sport-2-dagurinn'
  serve(url, res, next)
})

/* Stod 3*/
app.get('/tv/stod3', (req, res, next) => {
  const url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-3-dagurinn'
  serve(url, res, next)
})

/* Stod 2 Bio */
app.get('/tv/stod2bio', (req, res, next) => {
  const url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Bio-dagurinn'
  serve(url, res, next)
})

/* Stod 2 Gull */
app.get('/tv/stod2gull', (req, res, next) => {
  const url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Extra-dagurinn'
  serve(url, res, next)
})
