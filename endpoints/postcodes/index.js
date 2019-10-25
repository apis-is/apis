/* eslint-disable import/first */
const request = require('request')
const h = require('apis-helpers')
const app = require('../../server')

app.get('/postcodes', async (req, res) => {
  request.get({
    headers: { 'User-Agent': h.browser() },
    url: `https://posturapi.prod.postur.is/api/postcodes`,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ error: 'www.postur.is refuses to respond or give back data' })
    }
    try {
      return res.cache(86400).send({ results: JSON.parse(body) })
    } catch (error) {
      return res.status(500).json({ error: 'www.postur.is changed format of data' })
    }
  })
})
