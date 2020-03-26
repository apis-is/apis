/* eslint-disable import/first */
const request = require('request')
const h = require('apis-helpers')
const cheerio = require('cheerio')
const app = require('../../server')

app.get('/currency/cb', (req, res) => {
  request.get({
    headers: { 'User-Agent': h.browser() },
    url: 'https://www.sedlabanki.is/hagtolur/opinber-gengisskraning/',
  }, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).json({ error: 'www.sedlabanki.is refuses to respond or give back data' })
    }

    const $ = cheerio.load(body)
    const currencies = []

    $('.Gengistafla').first().find('tr').each(function () {
      const tds = $(this).find('td')
      const name = tds.eq(0).text()

      if (name) {
        currencies.push({
          shortName: name,
          longName: tds.eq(1).text(),
          value: tds.eq(4).text(),
          askValue: null,
          bidValue: null,
          changeCur: null,
          changePer: null,
        })
      }
    })

    // cache for 15 minutes
    return res.cache(900).json({ results: currencies })
  })
})
