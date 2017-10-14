/* eslint-disable */

const h = require('apis-helpers')
const request = require('request')
const app = require('../../server')
const busStopNames = require('./stops_names').default

const debug = require('debug')('bus/realtime')

function parseTimeStamp(timeStamp) {
  var parts = timeStamp.match(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/)
  parts.splice(0, 1)
  parts[0] = '20' + parts[0]
  return Math.floor(Date.UTC(...parts.map(Number)) / 1000)
}

const getBusRoutes = (data) => new Promise((resolve, reject) => {
  const reykjavikBusRoutes = [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 26, 27, 28, 29, 31, 33, 34, 35, 43, 44],
    southBusRoutes = [51, 52, 71, 72, 73, 75],
    northWestBusRoutes = [57, 58, 59, 81, 82, 83, 84, 85, 86],
    northEastBusRoutes = [56, 78, 79],
    akureyriBusRoutes = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
    sudurnesBusRoutes = [55, 87, 88, 88, 89],
    reykjanesBusRoutes = ['R1', 'R2', 'R3', 'R4']
  const allBusRoutes = reykjavikBusRoutes.concat(
    southBusRoutes,
    northWestBusRoutes,
    northEastBusRoutes,
    akureyriBusRoutes,
    sudurnesBusRoutes,
    reykjanesBusRoutes)

  request.get('https://app.straeto.is/pele/api/v1/positions/filter/' + allBusRoutes.join('%2C'), function (error, response, body) {
    if (error || response.statusCode !== 200) {
      return reject('The bus api is down or refuses to respond')
    }

    var obj
    try {
      obj = JSON.parse(body)
    } catch (error) {
      return reject(error)
    }

    var requestedRoutes = data.busses.split(',').filter(Boolean)

    var objRoutes = {
      results: []
    }

    // If no bus routes was requested then return all bus routes
    if (requestedRoutes.length == 0) {
      requestedRoutes = allBusRoutes
    }

    var busses = obj.positions || []

    requestedRoutes.forEach(function (route) {
      var objRoute = {
        busNr: route,
        busses: []
      }
      busses.forEach(function (bus) {
        if (bus.routeNumber == route) {
          objRoute.busses.push({
            //'unixTime': Math.floor(bus.gpsTime / 1000),
            'unixTime': parseTimeStamp(bus.gpsTime),
            'x': bus.lat,
            'y': bus.lon,
            'from': busStopNames[bus.lastStop].name,
            'to': busStopNames[bus.nextStop].name
          })
        }
      })
      if(objRoute.busses.length > 0){
        objRoutes.results.push(objRoute)
      }
    })
    // Ensure that the response is of proper form
    if(objRoutes.results.length == 0){
      objRoutes.results.push({
        busNr: '',
        busses: []
      })
    }

    return resolve(objRoutes)
  })
})

app.get('/bus/realtime', function (req, res) {
  var data = req.query

  getBusRoutes(data).then(
    (routes) => res.json(routes),
    () => res.status(500).json({ error:'Something is wrong with the data provided from the data source' })
  )
})

export default getBusRoutes
