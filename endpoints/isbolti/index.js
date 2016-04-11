import app from '../../server'
import request from 'request'
import cheerio from 'cheerio'
import iconv from 'iconv-lite'

// returns the stats table of Icelandic football teams.
// data retrieved from fotbolti.net.
app.get('/isbolti', (req, res) => {
  const stats = { results: [] }

  request({
    url: 'http://fotbolti.net/isboltinn.php',
    encoding: null,
  }, (error, response, html) => {
    let $
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ error: 'Could not retreive data from fotbolti.net' })
    }
    const body = iconv.decode(html, 'iso-8859-1')

    try {
      $ = cheerio.load(body)
    } catch (err) {
      return res.status(500).json({ error: 'Could not parse body' })
    }

    $('table tr').each(function (key) {
      if (key !== 0) {
        const temp = {
          place: $(this).children('td').slice(0).html(),
          team: $(this).children('td').slice(1).html(),
          gamesPlayed: $(this).children('td').slice(2).html(),
          gamesWon: $(this).children('td').slice(3).html(),
          gamesDraw: $(this).children('td').slice(4).html(),
          gamesLost: $(this).children('td').slice(5).html(),
          goals: $(this).children('td').slice(6).html(),
          goalDifference: $(this).children('td').slice(7).html(),
          points: $(this).children('td').slice(8).html(),
        }
        stats.results.push(temp)
      }
    })
    return res.send(stats)
  })
})
