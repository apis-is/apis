/* eslint-disable import/first */
const request = require('request')
const h = require('apis-helpers')
const _ = require('lodash')
const moment = require('moment')
const { parseString } = require('xml2js')
const app = require('../../server')



const getFlightData = (parameters, callback) => {

  // Default Parameters to upstream endpoint
  let query = {
    airport: 'KEF',
    cargo: 0,
    dateFrom: moment().subtract(5, 'minutes').format('YYYY-MM-DD HH:mm'),
    dateTo: moment().endOf('day').format('YYYY-MM-DD HH:mm'),
    language: 'en',
    departures: true
  }

  /* Allowed values are either 'departures' or 'arrivals' */
  if (parameters.type) {
    if (parameters.type === 'departures') {
      query.departures = true
    }
    if (parameters.type === 'arrivals') {
      query.departures = false
    }
  }

  /* Allowed values are either 'en' or 'is' */
  if (parameters.language) {
    if (parameters.language === 'en') {
      query.language = 'en'
    }
    if (parameters.language === 'is') {
      query.language = 'is'
    }
  }

  /* Allowed values are IATA-3 Airport names (only from Iceland) */
  if (parameters.airport) {
    if (parameters.airport.length === 3) {
      query.airport = parameters.airport
    }
  }

  /* Allowed values are either 0 or 1 */
  if (parameters.language) {
    if (parameters.language === 'en') {
      query.language = 'en'
    }
    if (parameters.language === 'is') {
      query.language = 'is'
    }
  }

  /* Allowed values datetime format YYYY-MM-DDTHH:mm 
  ** Expected maximum range back is 90 days
  */
  if (parameters.dateFrom) {
    let dateFrom = moment(parameters.dateFrom, 'YYYY-MM-DD[T]HH:mm')
    if (dateFrom.isValid()) {
      query.dateFrom = dateFrom.format('YYYY-MM-DD HH:mm')
    }
  }

  /* Allowed values datetime format YYYY-MM-DDTHH:mm 
  ** Expected maximum range forward is the current flight season (summer/winter) which is usually 30+ days
  */
  if (parameters.dateTo) {
    let dateTo = moment(parameters.dateTo, 'YYYY-MM-DD[T]HH:mm')
    if (dateTo.isValid()) {
      query.dateTo = dateTo.format('YYYY-MM-DD HH:mm')
    }
  }

  const baseUrl = 'https://www.isavia.is/json/flight'
  let url = encodeURI(
    `${baseUrl}/?airport=${query.airport}&cargo=${query.cargo}&dateFrom=${query.dateFrom}&dateTo=${query.dateTo}&language=${query.language}&departures=${query.departures}`
  )
  let flights = []
  request.get({
    url,
    headers: {
      'User-Agent': h.browser()
    },
    json: true
  }, (error, response, body) => {

    if (error) {
      callback(`Could not fetch data from upstream API endpoint: ${error}`)
    }

    if (_.has(body, 'Code')) {
      if (body.Code !== '') {
        callback(`Upstream API endpoint contains an error: ${body}`)
      }
    }
    if (_.has(body, 'Items')) {
      flights = body.Items
    }
    return callback(false, flights)
  })

}

/**********************************
 *** Version 1 - Legacy ****
**********************************/
app.get(['/flight', '/flight/v1'], (req, res) => {
  getFlightData(req.query, (error, flights) => {
    if (error) {
      return res.status(500).json({
        error: error
      })
    }

    const legacyFlights = _.map(flights, function(f){
      return {
        "date": moment(f.Scheduled).format('D. MMM.'),
        "flightNumber": f.No,
        "airline": f.Airline,
        "to": f.OriginDest,
        "plannedArrival": moment(f.Scheduled).format('HH:mm'),
        "realArrival": f.Estimated ? moment(f.Estimated).format('HH:mm') : '',
        "status": f.Status
      }
    })

    // Generally we can expect flight data to change every 60 seconds or less
    return res.cache(60).json(legacyFlights)
  })
})
/**********************************
 *** Version 2 - Moar Data! ****
**********************************/

app.get(['/flight/v2'], (req, res) => {

  getFlightData(req.query, (error, flights) => {
    if (error) {
      return res.status(500).json({
        error: error
      })
    }
    // Generally we can expect flight data to change every 60 seconds or less
    return res.cache(60).json(flights)
  })
})