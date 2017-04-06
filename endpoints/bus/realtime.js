/* eslint-disable */

const h = require('apis-helpers')
const request = require('request')
const app = require('../../server')

const debug = require('debug')('bus/realtime')

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

    var activeBusses = [],
      requestedRoutes = []

    const busses = obj.positions || []

    busses.forEach(function (object, key) {
      activeBusses.push(object.routeNumber)
    })
    var activeRoutes = activeBusses.filter((v, i, a) => a.indexOf(v) === i)

    var requestedRoutes
    if (data.busses) { // Post busses = 1,2,3,4,5,...
      // Prevent requested to busses that are not available
      requestedRoutes = data.busses.split(',').filter((v, i, a) => activeRoutes.indexOf(v) !== -1)
    } else {
      // No bus was posted, use all active busses
      requestedRoutes = activeRoutes
    }

    var objString = requestedRoutes.join('%2C')

    var objRoutes = {
      results: []
    }

    // If no valid bus route was requested then return an empty bus route
    if (requestedRoutes.length == 0) {
      objRoutes.results.push({ 
        busNr : '',
        busses: []
      })
      return resolve(objRoutes)
    }

    request.get('https://app.straeto.is/pele/api/v1/positions/filter/' + objString, function (error, response, body) {

      if (error || response.statusCode !== 200) {
        return reject(error)
      }

      try {
        var data = JSON.parse(body)
      } catch (e) {
        return reject(e)
      }

      var busses = data.positions || []

      requestedRoutes.forEach(function (route) {
        var objRoute = {
          busNr: route,
          busses: []
        }
        busses.forEach(function (bus) {
          if (bus.routeNumber === route) {
            objRoute.busses.push({
              'unixTime': Math.floor(bus.gpsTime / 1000),
              'x': bus.lat,
              'y': bus.lon,
              'from': bus.lastStop,
              'to': bus.nextStop
            })
          }
        })
        if(objRoute.busses.length > 0){
          objRoutes.results.push(objRoute)
        }
      })

      return resolve(objRoutes)
    })
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
