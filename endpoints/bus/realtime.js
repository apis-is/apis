/* eslint-disable */

const h = require('apis-helpers')
const request = require('request')
const app = require('../../server')
const isn2wgs = require('isn2wgs')

const debug = require('debug')('bus/realtime')

const getBusRoutes = (data) => new Promise((resolve, reject) => {
  request.get('http://straeto.is/bitar/bus/livemap/json.jsp', function (error, response, body) {
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
      requestedBusses = []

    const routes = obj.routes || []

    routes.forEach(function (object, key) {
      activeBusses.push(object.id)
    })

    if (data.busses) { // Post busses = 1,2,3,4,5
      requestedBusses = data.busses.split(',')

      for (var i in requestedBusses) { // Prevent requested to busses that are not available
        if (activeBusses.indexOf(requestedBusses[i]) == -1) {
          requestedBusses.splice(requestedBusses.indexOf(requestedBusses[i]), 1)
        }
      }
    } else {
      // No bus was posted, use all active busses
      requestedBusses = activeBusses
    }

    var objString = requestedBusses.join('%2C')

    request('http://straeto.is/bitar/bus/livemap/json.jsp?routes=' + objString, function (error, response, body) {

      if (error || response.statusCode !== 200) {
        return reject(error)
      }

      try {
        var data = JSON.parse(body)
      } catch (e) {
        return reject(e)
      }

      var routes = data.routes || []

      var objRoutes = {
        results: []
      }
      routes.forEach(function (route, key) {

        var objRoute = {
          busNr: route.id || '', // will be undefined if none are active
          busses: []
        }
        objRoutes.results.push(objRoute)

        if (!route.busses) return // No busses active, eg. after schedule

        route.busses.forEach(function (bus, key) {

          var location = isn2wgs(bus.X, bus.Y),
            oneRoute = {
            'unixTime': Date.parse(bus.TIMESTAMPREAL) / 1000,
            'x': location.latitude,
            'y': location.longitude,
            'from': bus.FROMSTOP,
            'to': bus.TOSTOP
          }
          objRoute.busses.push(oneRoute)

        })

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
