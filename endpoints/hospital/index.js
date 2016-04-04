import request from 'request'
import app from '../../server'
import cheerio from 'cheerio'
import _ from 'lodash'

app.get('/hospital', (req, res) => {
  request.get(
    { url: 'http://www.landspitali.is/' },
    (err, response, body) => {
      if (err || response.statusCode !== 200) {
        return res.status(500).json({
          error: 'www.landspitali.is refuses to respond or give back data',
        })
      }

      let $
      try {
        $ = cheerio.load(body)
      } catch (e) {
        return res.status(500).json({
          error: 'An error occured when parsing the data from landspitali.is',
        })
      }

      const data = {}
      _.each(
        $('.activityNumbers.activityNumbersNew').children('div'),
        (elem) => {
          data[elem.attribs.class] = parseInt(
            $(elem).children().eq(1).html(), 10
          )
        }
      )
      // Cache for a hour.
      return res.cache(3600).json({ results: [data] })
    })
})
