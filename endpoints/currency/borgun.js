/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
const request = require('request')
const xml2js = require('xml2js')
const app = require('../../server')

const parseString = xml2js.parseString

app.get('/currency/borgun', (req, res) => {
  request.get(
    { url: 'https://www.borgun.is/currency/Default.aspx?function=all' },
    (err, response, xml) => {
      if (err || response.statusCode !== 200) {
        return res.status(500).json({ error: 'www.borgun.is refuses to respond or give back data' })
      }

      const currencies = []
      parseString(xml, { explicitRoot: false }, (parseError, result) => {
        if (parseError || result.Status[0].ResultCode[0] !== '0') {
          return res.status(500).json({ error: `Unable to parse Borgun data: ${JSON.stringify(err)}` })
        }

        for (let i = 0; i < result.Rate.length; i++) {
          const rate = result.Rate[i]
          currencies.push({
            currencyCode: rate.CurrencyCode[0],
            currencyDescription: rate.CurrencyDescription[0],
            currencyRate: parseFloat(rate.CurrencyRate[0]),
            country: rate.Country[0],
            countryEnglish: rate.CountryEnglish[0],
            countryCode: rate.CountryCode[0],
            rateDate: rate.RateDate[0],
          })
        }
        return res.cache(60).json({ results: currencies })
      })
    }
  )
})
