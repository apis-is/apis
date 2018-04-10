/* eslint-disable import/first */
const request = require('request')
const h = require('apis-helpers')
const cheerio = require('cheerio')
const _ = require('lodash')
const moment = require('moment')
const app = require('../../server')
const { parseString } = require('xml2js')

/* Translates the status to Icelandic and retains date values */
var statusToIcelandic = function (status, type) {
  if (_.includes(status, 'Estimat')) {
    if (type === "departures") {
      return _.replace(status, 'Estimat.', 'Áætluð brottför')
    } else {
      return _.replace(status, 'Estimat.', 'Áætluð lending')
    }
  } else if (_.includes(status, 'Go to Gate')) {
    return 'Fara að hliði'
  } else if (_.includes(status, 'Boarding')) {
    return 'Hlið opið'
  } else if (_.includes(status, 'Departed')) {
    return _.replace(status, 'Departed', 'Farin')
  } else if (_.includes(status, 'Cancelled')) {
    return 'Aflýst'
  } else if (_.includes(status, 'Delayed')) {
    return 'Seinkað'
  } else if (_.includes(status, 'Waiting next information')) {
    return 'Beðið eftir upplýsingum'
  } else if (_.includes(status, 'Gate Closed')) {
    return 'Hliði lokað'
  } else if (_.includes(status, 'Confirm')) {
    return _.replace(status, 'Confirm.', 'Staðfest')
  } else if (_.includes(status, 'Final Call')) {
    return 'Lokaútkall'
  } else if (_.includes(status, 'Check in Closed')) {
    return 'Innritun lokað'
  } else if (_.includes(status, 'Check in Open')) {
    return 'Innritun opin'
  } else if (_.includes(status, 'Landed')) {
    return _.replace(status, 'Landed', 'Lent')
  } else if (_.includes(status, 'Bags arrive shortly')) {
    return 'Töskur væntanlegar'
  } else if (_.includes(status, 'Bags on belt')) {
    return 'Töskur á belti'
  } else if (_.includes(status, 'All Bags on Belt')) {
    return 'Allar töskur á belti'
  } else {
    return status // Status not important or nothing to translate, return status for now
  }
}

app.get(['/flight', '/flight/v1'], (req, res) => {

  const data = req.query

  /* Information from Kefairport
  Departed / Farin
  Cancelled / Aflýst
  Delayed / Seinkað
  Diverted / Diverted
  Waiting next information / Beðið eftir upplýsingum
  Return to normal / Return to normal
  Scheduled / Scheduled
  Estimated / Áætluð brottför
  Confirmed / Staðfest
  Gate Closed / Hliði lokað
  Final Call / Lokaútkall
  Boarding / Hlið opið
  Check in Closed / Innritun lokað
  Check in Open / Innritun opin
  Go to Gate / Fara að hliði
  Landed / Lent
  Bags arrive shortly / Töskur væntanlegar
  Bags on Belt / Töskur á belti
  All Bags on Belt / Allar töskur á belti
  */

  /* Fetches the flight data and returns a JS object in a callback */
  var getJSONFlightData = function (url, callback) {
    request.get({
      headers: {
        'User-Agent': h.browser()
      },
      url,
    }, (error, response, body) => {
      if (error) {
        return callback(err, [])
      }

      parseString(body, {
        explicitArray: false
      }, (err, result) => {
        return callback(err, result)
      })
    })
  }

  /* Converts the data field to old format and translates if needed. */
  var getFlightTransformed = function (flight) {
    const dateFormatted = moment(flight.datetime, 'DD.MM.YYYY HH:mm:ss').format('D. MMM.')
    const statusTranslated = data.language === 'is' ? statusToIcelandic(flight.status, data.language) : flight.status
    if (data.type === 'departures') {
      return {
        date: dateFormatted,
        flightNumber: flight.flightno,
        airline: flight.airline,
        to: flight.destination,
        plannedArrival: flight.time, // Legacy bug
        realArrival: flight.estimated, // Legacy bug
        status: statusTranslated
      }
    } else {
      return {
        date: dateFormatted,
        flightNumber: flight.flightno,
        airline: flight.airline,
        from: flight.from,
        plannedArrival: flight.time,
        realArrival: flight.estimated,
        status: statusTranslated
      }
    }
  }

  /* default set as departures */
  let url = 'http://xml.kefairport.com/departures.xml'

  /* Allowed values are either 'departures' or 'arrivals' */
  if (!data.type) data.type = 'departures'

  /* Allowed values are either 'en' or 'is' */
  if (!data.language) data.language = 'is'

  // default settings are type: 'departures' and language: 'is'
  if (data.type === 'arrivals') {
    url = 'http://xml.kefairport.com/arrivals.xml'
  }

  getJSONFlightData(url, (err, flights) => {
    if (err) {
      return res.status(500).json({
        error: `Could not fetch and convert XML to JSON: ${error}`
      })
    }
    const obj = {
      results: []
    }
    // Reject if it does not respond correctly. 
    const needsToBePresent = data.type + '.flight'

    // Needs to have either departures' or 'arrivals'
    if (!_.has(flights, needsToBePresent)) {
      return res.status(500).json({
        error: 'Incorrect response from flight XML provider'
      })
    }

    let flightsConverted = []
    flightsConverted = _.map(flights[data.type].flight, (f) => {
      return getFlightTransformed(f)
    })
    obj.results = flightsConverted
    return res.cache(3600).json(obj)
  })
})