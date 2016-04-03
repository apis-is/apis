import request from 'request'
import moment from 'moment'
import xml2js from 'xml2js'
import h from 'apis-helpers'
import app from '../../server'

const parseString = xml2js.parseString

/* Parse feeds from RUV */
const parseFeed = function (callback, data) {
  parseString(data, (err, result, title) => {
    if (err) return callback(new Error(`Parsing of XML failed. Title ${title}`))

    const schedule = []

    if (result.schedule.error || !result.schedule.service[0].hasOwnProperty('event')) {
      return (callback(schedule))
    }

    for (let i = 0; i < result.schedule.service[0].event.length; ++i) {
      const event = result.schedule.service[0].event[i]
      schedule.push({
        title: event.title[0],
        originalTitle: event['original-title'][0],
        duration: event.$.duration,
        description: event.description[0],
        shortDescription: event['short-description'][0],
        live: event.live[0] === 'yes',
        premier: event.rerun[0] === 'yes',
        startTime: event.$['start-time'],
        aspectRatio: event['aspect-ratio'][0].size[0],
        series: {
          episode: event.episode[0].$.number,
          series: event.episode[0].$['number-of-episodes'],
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

    res.cache(1800).json({ results: data })
  })
}

/* RUV */
app.get('/tv/ruv', (req, res, next) => {
  let url = 'http://muninn.ruv.is/files/xml/ruv/'

  if (req.params.date) {
    if (moment(req.params.date).isValid()) {
      const date = moment(req.params.date)
      // Example : http://muninn.ruv.is/files/xml/ruv/2013-06-11/
      url += date.format('YYYY-MM-DD')
    }
  }

  serve(url, res, next)
})

/* RUV Ithrottir*/
app.get('/tv/ruvithrottir', (req, res, next) => {
  const url = 'http://muninn.ruv.is/files/xml/ruvithrottir/'
  serve(url, res, next)
})
