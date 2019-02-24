/* eslint-disable no-plusplus */
/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unneeded-ternary */

const request = require('request')
const xml2js = require('xml2js')
const h = require('apis-helpers')
const app = require('../../server')

const parseString = xml2js.parseString

const parseFeed = function (callback, data) {
  parseString(data, { explicitRoot: false }, (err, result) => {
    if (err) return callback(new Error(`Parsing of XML failed. Title ${err}`))
    const roads = []

    for (let i = 0; i < result.Faerd.length; ++i) {
      const Road = result.Faerd[i]
      roads.push({
        routeId: Road.IdLeid[0].length > 0 ? Road.IdLeid[0] : null, // Can be null
        routeName: Road.LeidNafn[0].length > 0 ? Road.LeidNafn[0] : null, // Can be null
        segmentId: parseInt(Road.IdButur[0], 10),
        segmentSerial: Road.Rodun[0],
        segmentName: Road.LangtNafn[0],
        segmentShortName: Road.StuttNafn[0],
        segmentSignal: Road.Skilti[0].length > 0 ? Road.Skilti[0] : null,
        conditionId: Road.IdAstand[0],
        conditionDescription: Road.FulltAstand[0],
        conditionShortDescription: Road.StuttAstand[0],
        priority: parseInt(Road.Forgangur[0], 10),
        comment: Road.Aths[0].length > 0 ? Road.Aths[0] : null,
        date: Road.DagsKeyrtUt[0],
        isHighlands: parseInt(Road.ErHalendi[0], 2) === 1 ? true : false,
        colorCode: Road.Linulitur[0].length > 0 ? Road.Linulitur[0] : null,
        conditionUpdated: Road.DagsSkrad[0],
        surfaceCondition: Road.AstandYfirbords[0],
      })
    }
    return callback(null, roads)
  })
}

const getFeed = function (url, callback) {
  request.get({
    headers: { 'User-Agent': h.browser(), 'Content-Type': 'application/xml; charset=utf-8' },
    encoding: 'utf-8',
    url,
  }, (error, response, body) => {
    console.log(body)
    if (error) return callback(new Error(`${url} did not respond ${JSON.stringify(error)}`))
    parseFeed(callback, body)
  })
}

const serve = function (url, res, next) {
  getFeed(url, (err, data) => {
    if (err) {
      console.error(err)
      return next(502)
    }
    res.cache(1800).json({ results: data })
  })
}

app.get('/road/all', (req, res, next) => {
  const url = 'http://gagnaveita.vegagerdin.is/api/faerd2014_1'
  serve(url, res, next)
})
