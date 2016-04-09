import request from 'request'
import h from 'apis-helpers'
import app from '../../server'
import cheerio from 'cheerio'

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

    $('table tr').each(function (key) {
      if (key !== 0) {
        let flight = {}
        if (data.type === 'departures') {
          flight = {
            date: $(this).children('td').slice(0).html(),
            flightNumber: $(this).children('td').slice(1).html(),
            airline: $(this).children('td').slice(2).html(),
            to: $(this).children('td').slice(3).html(),
            plannedArrival: $(this).children('td').slice(4).html(),
            realArrival: $(this).children('td').slice(5).html(),
            status: $(this).children('td').slice(6).html(),
          }
        } else {
          flight = {
            date: $(this).children('td').slice(0).html(),
            flightNumber: $(this).children('td').slice(1).html(),
            airline: $(this).children('td').slice(2).html(),
            from: $(this).children('td').slice(3).html(),
            plannedArrival: $(this).children('td').slice(4).html(),
            realArrival: $(this).children('td').slice(5).html(),
            status: $(this).children('td').slice(6).html(),
          }
        }

        obj.results.push(flight)
      }
    })

    return res.cache(3600).json(obj)
  })
})
