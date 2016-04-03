import request from 'request'
import xml2js from 'xml2js'
import app from '../../server'
const parseString = xml2js.parseString

app.get('/particulates', (req, res) => {
  request.get({
    url: 'http://www.loft.rvk.is/xml/Xsvifryk.xml',
  }, (err, response, xml) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).json({
        error: 'www.loft.rvk.is refuses to respond or give back data',
      })
    }

    const particulates = []
    parseString(xml, { explicitRoot: false }, (parseError, result) => {
      particulates.push({
        PM10nuna: result.PM10nuna[0],
        PM10medaltal: result.PM10medaltal[0],
        Counter: result.Counter[0],
        Dags: result.Dags[0],
        nanariuppl: result.nanariuppl[0],
      })

      return res.json({ results: particulates })
    })
  })
})
