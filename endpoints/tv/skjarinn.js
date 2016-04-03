import request from 'request'
import moment from 'moment'
import xml2js from 'xml2js'
import h from 'apis-helpers'
import app from '../../server'

const parseString = xml2js.parseString

/* Parse feed from Skjarinn */
const parseSkjar1 = function (callback, data) {
  parseString(data, (err, result, title) => {
    if (err) throw new Error(`Parsing of XML failed. Title ${title}`)

    const schedule = []

    for (let i = 0; i < result.schedule.service[0].event.length; ++i) {
      const event = result.schedule.service[0].event[i]
      if (moment().add('d', 1).startOf('day').hour(6) > moment(event.$['start-time'])) {
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
    }
    return callback(schedule)
  })
}

/* Skjar 1 */
app.get('/tv/:var(skjar1|skjareinn)', (req, res) => {
  res.status(503).json({ error: 'Source page has changed. Scraping needs to be re-implemented' })
  return
  /* eslint-disable */
  const url = 'http://www.skjarinn.is/einn/dagskrarupplysingar/?channel_id=7&output_format=xml'

  request.get({
    headers: { 'User-Agent': h.browser() },
    url: url
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      return res.status(504).json({ error:'skjarinn.is is not responding with the right data' })
    }

    parseSkjar1(function (data) {
      res.cache(1800).json(200, {
        results: data
      })
    }, body)
  })
})
