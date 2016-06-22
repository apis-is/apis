import request from 'request'
import moment from 'moment'
import h from 'apis-helpers'
import app from '../../server'

app.get('/currency/arion/:type?', (req, res) => {
  // types: AlmenntGengi,KortaGengi(valitor),SedlaGengi,AirportGengi
  const type = req.params.type || 'AlmenntGengi'
  let toSend = 'm=GetCurrencies'

  toSend += `&beginDate=${moment().format('YYYY-MM-DD')}`
  toSend += `&finalDate=${moment().format('YYYY-MM-DD')}`
  toSend += `&currencyType=${type}`
  toSend += '&currenciesAvailable=ISK%2CUSD%2CGBP%2CEUR%2CCAD%2CDKK%2CNOK%2CSEK%2CCHF%2CJPY%2CXDR'
  request.get({
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: 'https://www.arionbanki.is/Webservice/PortalCurrency.ashx',
    body: toSend,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ error: 'www.arionbanki.is refuses to respond or give back data' })
    }

    const jsonObject = JSON.parse(body)
    const currencies = []

    jsonObject.forEach((object) => {
      const changePer = parseFloat(object.LastValueChange) / parseFloat(object.MidValue)
      const currency = {
        shortName: object.Ticker,
        longName: h.currency[object.Ticker].long,
        value: object.MidValue,
        askValue: object.AskValue,
        bidValue: object.BidValue,
        changeCur: object.LastValueChange,
        changePer: changePer.toFixed(2),
      }

      if (currency.changePer === '-0.00') {
        currency.changePer = 0
      }

      currencies.push(currency)
    })

    return res.json({ results: currencies })
  })
})
