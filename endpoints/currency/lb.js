import request from 'request'
import xml2js from 'xml2js'
import app from '../../server'
const parseString = xml2js.parseString

app.get('/currency/lb/:type?', (req, res) => {
  // A = Almennt gengi, S = Seðlagengi
  const type = req.params.type || 'A'

  request.get({
    url: `https://www.landsbankinn.is/modules/markets/services/XMLGengi.asmx/NyjastaGengiByType?strTegund=${type}`,
  }, (err, response, xml) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).json({ error: 'www.landsbankinn.is refuses to respond or give back data' })
    }

    const currencies = []
    parseString(xml, { explicitRoot: false }, (parseError, result) => {
      const arr = result.GjaldmidillRow
      for (let i = 0; i < arr.length; i++) {
        currencies.push({
          shortName: arr[i].Mynt[0],
          longName: arr[i].Heiti[0],
          value: parseFloat(arr[i].Midgengi),
          askValue: parseFloat(arr[i].Sala),
          bidValue: parseFloat(arr[i].Kaup),
          changeCur: parseFloat(arr[i].Breyting[0]),
          changePer: parseFloat((parseFloat(arr[i].Breyting) / parseFloat(arr[i].Midgengi)).toFixed(2)),
        })
      }
      return res.json({ results: currencies })
    })
  }
  )
})
