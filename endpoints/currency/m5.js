import request from 'request'
import h from 'apis-helpers'
import app from '../../server'
import cheerio from 'cheerio'

app.get('/currency/m5', (req, res) => {
  // FIXME: Not being used, comment out for now
  // const currencyNames = {
  //   s: ['USD', 'DKK', 'EUR', 'JPY', 'CAD', 'NOK', 'GBP', 'CHF', 'SEK', 'TWI', 'XDR', 'ISK'],
  //   l: [
  //     'Bandarískur dalur',
  //     'Dönsk króna',
  //     'Evra',
  //     'Japanskt jen',
  //     'Kanadískur dalur',
  //     'Norsk króna',
  //     'Sterlingspund',
  //     'Svissneskur franki',
  //     'Sænsk króna',
  //     'Gengisvísitala',
  //     'SDR',
  //     'Íslensk króna',
  //   ],
  // }

  request.get({
    headers: { 'User-Agent': h.browser() },
    url: 'http://www.m5.is/?gluggi=gjaldmidlar',
  }, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).json({ error: 'www.m5.is refuses to respond or give back data' })
    }

    const $ = cheerio.load(body)
    const currencies = []

    $('.table-striped tr').each(function () {
      const tds = $(this).find('td')
      const name = tds.eq(0).text()

      if (name) {
        currencies.push({
          shortName: name,
          longName: h.currency[name].long,
          value: parseFloat(tds.eq(2).text().replace(',', '.')),
          askValue: 0,
          bidValue: 0,
          changeCur: parseFloat(tds.eq(4).text().replace(',', '.')),
          changePer: parseFloat(tds.eq(5).text().replace(/\((.*)%\)/, '$1').replace(',', '.')),
        })
      }
    })

    return res.json({ results: currencies })
  })
})
