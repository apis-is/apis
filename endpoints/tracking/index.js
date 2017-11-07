/* eslint-disable no-param-reassign */

const request = require('request')
const cheerio = require('cheerio')
const app = require('../../server')

app.get('/tracking/:trackingNumber', (req, res) => {
  const url = 'http://www.postur.is/' +
    'einstaklingar/senda-pakka-innanlands/finna-sendingu/' +
    `?TrackingNumber=${req.params.trackingNumber}&Language=IS`

  request.get(url, (err, response, body) => {
    const $ = cheerio.load(body)

    const history = $('table').eq(1).find('tr').map((index, row) => {
      return {
        date: $(row).children().eq(0).text()
          .replace(/\s/g, ''),
        action: $(row).children().eq(1).text()
          .replace(/\s/g, ''),
      }
    })
      .get()
      .slice(1)
      .reduce((sum, curr) => {
        sum[curr.date] = curr.action
        return sum
      }, {})

    if (Object.keys(history).length === 0) {
      return res.status(404).json({})
    }

    return res.cache(60).json({
      history,
    })
  })
})
