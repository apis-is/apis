import request from 'request'
import $ from 'cheerio'
import h from 'apis-helpers'
import app from '../../server'

app.get('/carparks', (req, res) => {
  const url = 'http://www.bilastaedasjodur.is/'

  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        error: 'www.bilastaedasjodur.is refuses to respond or give back data',
      })
    }

    try {
      // FIXME: What is the point of this? It doesn't seem to be used anywhere
      // eslint-disable-next-line no-unused-vars
      const data = $(body)
    } catch (exc) {
      return res.status(500).json({ error: 'Could not parse body' })
    }

    const obj = { results: [] }
    const hus = $('.hus', $(body))

    const js = body.match(/LatLng\((.*?)\)/g)

    function parseCoordinates(str) {
      try {
        const Regexp = /(?:^|\s)LatLng.(.*?)\)(?:\s|$)/g
        const match = Regexp.exec(str)
        return match[1].split(', ')
      } catch (exc) {
        return null
      }
    }

    for (let i = 0; i < hus.length; i++) {
      const that = hus[i]
      const freeSpaces = parseInt($(that).find('.ib.free h1').text(), 10)
      const totalSpaces = parseInt($(that).find('.ib.total h1').text(), 10)

      obj.results.push({
        name: $(that).find('aside h2').text(),
        address: $(that).find('h5').text(),
        parkingSpaces: {
          free: !isNaN(freeSpaces) ? freeSpaces : null,
          total: !isNaN(totalSpaces) ? totalSpaces : null,
        },
        coordinates: parseCoordinates(js[i]),
      })
    }

    return res.cache(180).json(obj)
  })
})
