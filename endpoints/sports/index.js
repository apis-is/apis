/** ***************************
 * Name:     Sports API
 * Author:   Jón Orri Kristjánsson
 * Created:  March 2014
 */

import request from 'request'
import h from 'apis-helpers'
import app from '../../server'
import cheerio from 'cheerio'

/** Routes **/

/* Root sports handler */
app.get('/sports', (req, res, next) => {
  res.json(
    {
      results: [
        {
          info: 'This is an api for Icelandic sports events',
          endpoints: {
            football: '/sports/football/',
            handball: '/sports/handball/',
            'football-male-leagues': '/sports/football/male-leagues/',
            'football-female-leagues': '/sports/football/female-leagues/',
          },
        },
      ],
    }
  )
  next()
})

/* Root footbal male leagues handler */
app.get('/sports/football/male-leagues', (req, res, next) => {
  res.json(
    {
      results: [
        {
          info: 'This is an api for Icelandic male football leagues',
          endpoints: {
            'borgun-cup': '/sports/football/male-leagues/borgun/',
            pepsi: '/sports/football/male-leagues/pepsi/',
            '1st': '/sports/football/male-leagues/1st/',
            '2nd': '/sports/football/male-leagues/2nd/',
            '3rd': '/sports/football/male-leagues/3rd/',
          },
        },
      ],
    }
  )
  next()
})

/* Root footbal female leagues handler */
app.get('/sports/football/female-leagues', (req, res, next) => {
  res.json(
    {
      results: [
        {
          info: 'This is an api for Icelandic female football leagues',
          endpoints: {
            'borgun-cup': '/sports/football/female-leagues/borgun/',
            pepsi: '/sports/football/female-leagues/pepsi/',
          },
        },
      ],
    }
  )
  next()
})

/* Football */
app.get('/sports/football', (req, res) => {
  const url = 'http://www.ksi.is/mot/naestu-leikir/'
  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ error: 'www.ksi.is refuses to respond or give back data' })
      }

      let $

      try {
        $ = cheerio.load(body)
      } catch (exc) {
        return res.status(500).json({ error: 'Could not parse body' })
      }

      const obj = { results: [] }
      const fields = ['counter', 'date', 'time', 'tournament', 'location', 'homeTeam', 'awayTeam']
      try {
        $('#leikir-tafla tr').each((key, element) => {
          if (key !== 0) {
            const game = {}
            $('td', element).each(function (key2) {
              const val = $(this).text()
              if (val && val.trim() && val !== '' && val !== 0 && val !== '\t' && val !== '\n') {
                game[fields[key2]] = val
              }
            })

            // Checking whether it has the necessary fields
            if (game.counter && game.date && game.time && game.tournament && game.location
              && game.homeTeam && game.awayTeam) {
              obj.results.push(game)
            }
          }
        })
      } catch (exc) {
        return res.status(500).json({ error: 'Could not parse the game data' })
      }

      return res.json(obj)
    })
})

function footballLeagues(url, req, res) {
  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ error: 'www.ksi.is refuses to respond or give back data' })
      }

      let $

      try {
        $ = cheerio.load(body)
      } catch (exc) {
        return res.status(500).json({ error: 'Could not parse body' })
      }

      const obj = { results: [] }
      const fields = ['counter', 'date', 'time', 'teams', 'location', 'scores']
      try {
        $('#leikir-tafla tr').each(function (key) {
          if (key !== 0) {
            const game = {}
            $('td', this).each(function (key2) {
              const val = $(this).text()
              if (val !== 0 && val !== '\t' && val !== '\n' && fields[key2]) {
                game[fields[key2]] = val
              }
            })

            // Checking whether it has the necessary fields
            if (game.counter && game.date && game.time && game.teams && game.location) {
              obj.results.push(game)
            }
          }
        })
      } catch (exc) {
        return res.status(500).json({ error: 'Could not parse the game data' })
      }

      return res.json(obj)
    })
}

/* Football male borgun cup */
app.get('/sports/football/male-leagues/borgun', (req, res) => {
  const url = 'http://www.ksi.is/mot/motalisti/urslit-stada/?MotNumer=35590'
  return footballLeagues(url, req, res)
})

/* Football male Pepsi league */
app.get('/sports/football/male-leagues/pepsi', (req, res) => {
  const url = 'http://www.ksi.is/mot/motalisti/urslit-stada/?MotNumer=35586'
  return footballLeagues(url, req, res)
})

/* Football male 1st league */
app.get('/sports/football/male-leagues/1st', (req, res) => {
  const url = 'http://www.ksi.is/mot/motalisti/urslit-stada/?MotNumer=35585'
  return footballLeagues(url, req, res)
})

/* Football male 2nd league */
app.get('/sports/football/male-leagues/2nd', (req, res) => {
  const url = 'http://www.ksi.is/mot/motalisti/urslit-stada/?MotNumer=35584'
  return footballLeagues(url, req, res)
})

/* Football male 3rd league */
app.get('/sports/football/male-leagues/3rd', (req, res) => {
  const url = 'http://www.ksi.is/mot/motalisti/urslit-stada/?MotNumer=35307'
  return footballLeagues(url, req, res)
})

/* Football female borgun cup */
app.get('/sports/football/female-leagues/borgun', (req, res) => {
  const url = 'http://www.ksi.is/mot/motalisti/urslit-stada/?MotNumer=35587'
  return footballLeagues(url, req, res)
})

/* Football female Pepsi league */
app.get('/sports/football/female-leagues/pepsi', (req, res) => {
  const url = 'http://www.ksi.is/mot/motalisti/urslit-stada/?MotNumer=35583'
  return footballLeagues(url, req, res)
})


/* Handball */
app.get('/sports/handball', (req, res) => {
  const url = 'http://hsi.is/library/motamal/naestu.htm'
  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ error: 'www.hsi.is refuses to respond or give back data' })
      }

      let $
      try {
        $ = cheerio.load(body)
      } catch (exc) {
        return res.status(500).json({ error: 'Could not parse body' })
      }

      const obj = { results: [] }
      const fields = ['Date', 'Time', 'Tournament', 'Venue', 'Teams']

      try {
        $('table').eq(1).find('tr').each(function (key) {
          if (key !== 0) {
            const game = {}
            $('td', this).each(function (key2) {
              const val = $(this).text().trim()
              if (val && val !== '' && val !== 0) {
                game[fields[key2]] = val
              }
            })

            if (game.Date && game.Time && game.Tournament && game.Venue && game.Teams) {
              obj.results.push(game)
            }
          }
        })
      } catch (exc) {
        return res.status(500).json({ error: `Could not parse the game data: ${error}` })
      }

      return res.json(obj)
    })
})
