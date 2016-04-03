import request from 'request'
import cheerio from 'cheerio'
import h from 'apis-helpers'
import _ from 'lodash'
import { parse as parseUrl } from 'url'
import app from '../../server'

app.get('/golf/teetimes', (req, res) => {
  const clubId = req.query.club
  if (!clubId) {
    return res.status(500).json({
      error: 'Please provide a valid club id to lookup',
    })
  }

  request.get({
    // http://stackoverflow.com/a/20091919
    rejectUnauthorized: false,
    headers: { 'User-Agent': h.browser() },
    url: `http://mitt.golf.is/pages/rastimar/rastimayfirlit/?club=${clubId}`,
  }, (err, response, html) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).json({
        error: 'mitt.golf.is refuses to respond or give back data',
      })
    }
    const $ = cheerio.load(html)
    const rows = $('table.teeTimeTable tbody').children()
    let time = ''
    return res.cache().json({
      results: _.map(rows, (row) => {
        const $row = $(row)
        time = $row.children('td.time').html() === null ? time : $row.children('td.time').html()
        return {
          time,
          name: $($row.children('td.name')).html(),
          club: $($row.children('td.club')).html(),
          handicap: $($row.children('td.handicap')).html(),
        }
      }),
    })
  })
})

app.get('/golf/clubs', (req, res) => {
  request.get({
    // http://stackoverflow.com/a/20091919
    rejectUnauthorized: false,
    headers: { 'User-Agent': h.browser() },
    url: 'http://mitt.golf.is/pages/rastimar/',
  }, (err, response, html) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).json({
        error: 'mitt.golf.is refuses to respond or give back data',
      })
    }

    const $ = cheerio.load(html)
    // Skip the first element.
    const rows = $('table.golfTable tr').slice(2)
    return res.cache(3600).json({
      results: _.map(rows, (row) => {
        const $row = $(row)
        const url = (
          $row.children('td.club').children('a').attr('href')
        )

        const query = parseUrl(url, true).query

        return {
          abbreviation: $row.children('td.abbreviation').html(),
          club: {
            id: query.club,
            name: $row.children('td.club').children('a').html(),
          },
          location: $row.children('td.location').html(),
        }
      }),
    })
  })
})
