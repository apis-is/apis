import request from 'request'
import cheerio from 'cheerio'
import app from '../../server'

app.get('/hljomaholl', (req, res) => {
  const url = 'http://www.hljomaholl.is/vidburdir'

  request.get(url, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        error: 'www.hljomaholl.is refuses to respond or give back data',
      })
    }

    let $

    try {
      $ = cheerio.load(body)
    } catch (err) {
      return res.status(500).json({
        error: 'Could not parse body',
      })
    }

    const obj = { results: [] }
    const fields = [
      'date',
      'time',
      'image',
      'title',
      'description',
      'location',
      'buyTicketURL',
      'moreInfoURL',
    ]

    try {
      $('.main-content-body ul').find('li').each(() => {
        const event = {}
        let counter = 0
        $('.time', this).find('time').each((key) => {
          if (counter === 2) {
            return false
          }

          const val = $(this).text()
          event[fields[key]] = val
          counter++
        })
        event[fields[2]] = $('img', this).attr('src')
        event[fields[3]] = $('.time h1', this).text().trim()
        event[fields[4]] = $('p', this).text().trim()
        event[fields[5]] = $('.time h2', this).text().trim()
        event[fields[6]] = $('.btn-wrapper', this)
          .find('.btn-green').attr('href') || false

        const href = $('.btn-wrapper', this)
          .find('.btn-blue')
          .attr('href')
        event[fields[7]] = `http://www.hljomaholl.is${href}`

        obj.results.push(event)
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Could not parse event data',
      })
    }

    return res.json(obj)
  })
})
