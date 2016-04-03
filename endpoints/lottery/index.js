import request from 'request'
import app from '../../server'
import cheerio from 'cheerio'


const parseList = function (body) {
  let $
  try {
    $ = cheerio.load(body)
  } catch (error) {
    throw new Error('Could not parse body')
  }

  const results = []

  const tr = $('table').eq(1).find('tr')

  tr.each(function (i) {
    if (i === 0) return
    const td = $(this).find('td')

    results.push({
      date: td.eq(0).text().trim(),
      lotto: td.eq(1).html().match(/\d{1,2}/g).join(' ').replace(/(\d{1,2})$/, '($1)'),
      joker: td.eq(2).text().trim(),
      prize: td.eq(3).text().trim(),
      link: `http://lotto.is${td.eq(4).find('a').attr('href').trim()}`,
    })
  })

  return results
}

const getLottery = function (callback, providedUrl) {
  const url = providedUrl || 'https://igvefur.lotto.is/lottoleikir/urslit/lotto/'

  const params = { url }

  request(params, (error, res, body) => {
    if (error) return callback(error)

    if (res.statusCode !== 200) {
      return callback(new Error(`HTTP error from endpoint, status code ${res.statusCode}`))
    }

    return callback(null, body)
  })
}

const getLotto = (req, res, next) => {
  getLottery((err, body) => {
    if (err) {
      return next(502)
    }
    return res.cache(3600).json({
      results: parseList(body),
    })
  })
}

app.get('/lottery', getLotto)
app.get('/lottery/lotto', getLotto)

app.get('/lottery/vikingalotto', (req, res, next) => {
  getLottery((err, body) => {
    if (err) {
      return next(502)
    }
    return res.cache(3600).json({
      results: parseList(body),
    })
  }, 'https://games.lotto.is/lottoleikir/urslit/vikingalotto/')
})
app.get('/lottery/eurojackpot', (req, res, next) => {
  getLottery((err, body) => {
    if (err) {
      return next(502)
    }
    return res.cache(3600).json({
      results: parseList(body),
    })
  }, 'https://games.lotto.is/lottoleikir/urslit/eurojackpot/')
})
