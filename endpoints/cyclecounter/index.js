import request from 'request'
import xml2js from 'xml2js'
import app from '../../server'
const parseString = xml2js.parseString

app.get('/cyclecounter', (req, res) => {
  request.get({
    url: 'http://www.bicyclecounter.dk/BicycleCounter/GetCycleInfo?ran=1379500208853&StationId=235&LaneId=0',
  }, (err, response, xml) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).json({ error: 'www.bicyclecounter.dk refuses to respond or give back data' })
    }

    const cyclecounter = []
    parseString(xml, { explicitRoot: false }, (parseError, result) => {
      cyclecounter.push({
        DayCount: result.DayCount[0],
        YearCount: result.YearCount[0],
        Time: result.Time[0],
        Date: result.Date[0],
      })

      return res.json({ results: cyclecounter })
    })
  }
  )
})
