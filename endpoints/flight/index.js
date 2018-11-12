/* eslint-disable import/first */
const request = require('request')
const h = require('apis-helpers')
const cheerio = require('cheerio')
const app = require('../../server')

app.get('/flight', (req, res) => {
  const data = req.query
  let url = ''
  let $

  if (!data.type) data.type = ''
  if (!data.language) data.language = ''

  if (data.type === 'departures' && data.language === 'is') {
    url = 'http://www.kefairport.is/Flugaaetlun/Brottfarir/'
  } else if (data.type === 'departures' && data.language === 'en') {
    url = 'http://www.kefairport.is/English/Timetables/Departures/'
  } else if (data.type === 'arrivals' && data.language === 'is') {
    url = 'http://www.kefairport.is/Flugaaetlun/Komur/'
  } else if (data.type === 'arrivals' && data.language === 'en') {
    url = 'http://www.kefairport.is/English/Timetables/Arrivals/'
  } else {
    url = 'http://www.kefairport.is/English/Timetables/Arrivals/'
  }

  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ error: 'www.kefairport.is refuses to respond or give back data' })
    }
    try {
      $ = cheerio.load(body)
    } catch (err) {
      return res.status(500).json({ error: 'Could not parse body' })
    }

    const obj = { results: [] }

    $('.schedule-items-entry').each(function (key) {
      if (key !== 0) {
        let flight = {}
        if (data.type === 'departures') {
          flight = {
            date: $(this).children('td').slice(0).html(),
            flightNumber: $(this).children('td').slice(2).html(),
            airline: $(this).children('td').slice(3).children('span').html(),
            to: $(this).children('td').slice(1).children('span').html(),
            plannedArrival: 'not available', // Status contains data for plannedArrival now, consider deleting this var
            realArrival: 'not available', // There is not var on website named realArrival anymore, consider deleting it
            status: $(this).children('td').slice(4).children('span').html(),
          }
        } else {
          flight = {
            date: $(this).children('td').slice(0).html(),
            flightNumber: $(this).children('td').slice(2).html(),
            airline: $(this).children('td').slice(3).children('span').html(),
            from: $(this).children('td').slice(1).children('span').html(),
            plannedArrival: 'not available', // Status contains data for plannedArrival now, consider deleting this var
            realArrival: 'not available', // There is not var on website named realArrival anymore, consider deleting it
            status: $(this).children('td').slice(4).children('span').html(),
          }
        }
        obj.results.push(flight)
      }
    })

    return res.cache(3600).json(obj)
  })
})
