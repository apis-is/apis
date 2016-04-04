// TODO: Find a way to enable no-param-reassign
/* eslint-disable no-param-reassign */
import request from 'request'
import { parseString } from 'xml2js'
import h from 'apis-helpers'
import cheerio from 'cheerio'
import xregexp from 'xregexp'
import app from '../../server'

/*
 * ids (tegundir textaspáa)
 * can later be used to include a readable version of the measurement names
 */
const validTypes = [
  '2', '3', '5', '6', '7', '9', '10', '11', '12', '14', '27', '30', '31', '32',
  '33', '34', '35', '36', '37', '38', '39', '42',
]

const measurements = {
  is: {
    F: 'Vindhraði (m/s)',
    FX: 'Mesti vindhraði (m/s)',
    FG: 'Mesta vindhviða (m/s)',
    D: 'Vindstefna',
    T: 'Hiti (°C)',
    W: 'Veðurlýsing',
    V: 'Skyggni (km)',
    N: 'Skýjahula (%)',
    P: 'Loftþrýstingur (hPa)',
    RH: 'Rakastig (%)',
    SNC: 'Lýsing á snjó',
    SND: 'Snjódýpt',
    SED: 'Snjólag',
    RTE: 'Vegahiti (°C)',
    TD: 'Daggarmark (°C)',
    R: 'Uppsöfnuð úrkoma (mm/klst) úr sjálfvirkum mælum',
  },
  en: {
    F: 'Wind speed (m/s)',
    FX: 'Top wind speed (m/s)',
    FG: 'Top wind gust (m/s)',
    D: 'Wind direction',
    T: 'Air temperature (°C)',
    W: 'Weather description',
    V: 'Visibility (km)',
    N: 'Cloud cover (%)',
    P: 'Air pressure',
    RH: 'Humidity (%)',
    SNC: 'Snow description',
    SND: 'Snow depth',
    SED: 'Snow type',
    RTE: 'Road temperature (°C)',
    TD: 'Dew limit (°C)',
    R: 'Cumulative precipitation (mm/h) from automatic measuring units',
  },
}

const stationListURL = 'http://www.vedur.is/vedur/stodvar?t=3'

/* Fetches the weather data and returns a JS object in a callback */
function getJsonData(url, callback) {
  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  }, (error, response, body) => {
    if (error) {
      throw new Error(`${url} did not respond`)
    }

    parseString(body, (err, result) => {
      callback(result)
    })
  })
}

/* Root weather handler */
app.get('/weather', (req, res) => {
  return res.json({
    results: [{
      info: 'This is an api for Icelandic weather reports and observations',
      endpoints: {
        forecasts: '/weather/forecasts/',
        observations: '/weather/observations/',
        texts: '/weather/texts/',
      },
      other: {
        availableStations: '/weather/getAvailableStations',
      },
    }],
  })
})

/* Available stations handler */
app.get('/weather/getAvailableStations', (req, res) => {
  request(stationListURL, (error, response, body) => {
    if (error) {
      throw new Error(`${stationListURL} not responding correctly...`)
    }

    let $
    try {
      $ = cheerio.load(body)
    } catch (e) {
      throw new Error('Error loading DOM', e)
    }
    const idRegex = 'station=(\\d*)'
    const titleRegex = '^(([\\p{L}0-9-]*[\\s-]?)*)\\s-'
    const stations = []
    const hrefs = $(".listtable td a:contains('A')")

    for (let i = 0; i < hrefs.length; i++) {
      const elem = $(hrefs[i])
      // get the station title and id
      const titleMatch = xregexp.cache(titleRegex).exec(elem.attr('title'))
      const idMatch = xregexp.cache(idRegex).exec(elem.attr('href'))

      if (!idMatch || !titleMatch) {
        throw new Error('Parsing error -- Source is changed')
      }
      stations.push({
        name: titleMatch[1],
        id: idMatch[1],
      })
    }
    return res.cache(86400).json({ results: stations })
  })
})

/* Initial weather handler */
app.get('/weather/:type/:lang?', (req, res, next) => {
  const lang = req.params.lang

  // handle both ';' and ',' between stations and types
  if (req.query.stations) {
    req.query.stations = req.query.stations.split(',').join(';')
  }
  if (req.query.types) {
    req.query.types = req.query.types.split(',').join(';')
  }

  // make sure lang is correct
  if (lang && ['is', 'en'].indexOf(lang) === -1) {
    return res.status(400).json({
      results: [{
        error: 'incorrect language -- only "is" or "en" allowed',
      }],
    })
  }
  next()
})

/* Forecasts */
app.get('/weather/forecasts/:lang?', (req, res) => {
  const lang = req.params.lang || 'is'
  const stations = req.query.stations
  const descriptions = (
    req.query.descriptions === '' ||
    req.query.descriptions === '1' ||
    req.query.descriptions === 'true'
  )
  const params = Object.keys(measurements.is).join(';')
  const url = `http://xmlweather.vedur.is/?op_w=xml&view=xml&type=forec&lang=${lang}&ids=${stations}&params=${params}`
  const syntax = '/weather/forecasts[/(is|en)]?stations=<station1(,|;)...>'
  const example = '/weather/forecasts/is?stations=1,422'

  if (!stations) {
    return res.status(400).json({
      results: [{
        error: 'stations missing',
        syntax,
        example,
        moreInfo: 'http://www.vedur.is/um-vi/vefurinn/xml/',
      }],
    })
  }

  getJsonData(url, (providedForecasts) => {
    // make some nice changes to the object for cleaner JSON
    const forecasts = Object.assign({}, providedForecasts)
    forecasts.results = forecasts.forecasts.station
    delete forecasts.forecasts.station
    delete forecasts.forecasts
    h.deArrayfy(forecasts.results)

    forecasts.results.forEach((result) => {
      result.id = result.$.id
      result.valid = result.$.valid
      delete result.$
      if (lang === 'is') {
        result.forecast.forEach((f) => {
          Object.keys(f).forEach((m) => {
            f[m] = f[m].replace(/,/g, '.')
          })
        })
      }
    })
    if (descriptions) {
      forecasts.descriptions = measurements[lang]
    }
    return res.cache(300).json(forecasts)
  })
})

/* Observations */
app.get('/weather/observations/:lang?', (req, res) => {
  const lang = req.params.lang || 'is'
  const stations = req.query.stations
  const descriptions = (
    req.query.descriptions === '' ||
    req.query.descriptions === '1' ||
    req.query.descriptions === 'true'
  )
  const time = req.query.time
  const anytime = req.query.anytime
  const params = Object.keys(measurements.is).join(';')
  let url = `http://xmlweather.vedur.is/?op_w=xml&view=xml&type=obs&lang=${lang}&ids=${stations}&params=${params}`
  const syntax = (
    '/weather/observations[/(is|en)]?stations=<station1(,|;)...>[&time=(1h|3h)][&anytime=(0|1)]'
  )
  const example = '/weather/observations/is?stations=1,422&time=1h&anytime=0]'

  if (!stations) {
    return res.status(400).json({
      results: [{
        error: 'stations missing',
        syntax,
        example,
        moreInfo: 'http://www.vedur.is/um-vi/vefurinn/xml/',
      }],
    })
  }
  if (time) {
    url += `&time=${time}`
  }
  if (anytime) {
    url += `&anytime=${anytime}`
  }

  getJsonData(url, (observations) => {
    // make some nice changes to the object for cleaner JSON
    observations.results = observations.observations.station
    delete observations.observations.station
    delete observations.observations
    h.deArrayfy(observations.results)
    for (let i = observations.results.length - 1; i >= 0; i--) {
      const observation = observations.results[i]
      observation.id = observation.$.id
      observation.valid = observation.$.valid
      delete observation.$
      // fix decimal
      if (lang === 'is') {
        Object.keys(observation).forEach((m) => {
          observation[m] = observation[m].replace(/,/g, '.')
        })
      }
    }
    if (descriptions) {
      observations.descriptions = measurements[lang]
    }
    return res.cache(300).json(observations)
  })
})

/* Texts */
app.get('/weather/texts/:lang?', (req, res) => {
  const lang = req.params.lang || 'is'
  const types = req.query.types
  const url = `http://xmlweather.vedur.is/?op_w=xml&view=xml&type=txt&lang=${lang}&ids=${types}`
  const syntax = '/weather/texts[/(is|en)]?types=<type1(,|;)...>'
  const example = '/weather/texts/is?types=5,6'

  if (!types) {
    return res.status(400).json({
      results: [{
        error: 'types missing',
        syntax,
        example,
        validTypes,
        moreInfo: 'http://www.vedur.is/um-vi/vefurinn/xml/',
      }],
    })
  }

  getJsonData(url, (texts) => {
    // make some nice changes to the object for cleaner JSON
    texts.results = texts.texts.text
    delete texts.texts.text
    delete texts.texts
    h.deArrayfy(texts.results)
    for (let i = texts.results.length - 1; i >= 0; i--) {
      const text = texts.results[i]
      text.id = text.$.id
      delete text.$
      if (text.content instanceof Object) {
        delete text.content.br
        text.content = text.content._
      }
    }
    return res.cache(300).json(texts)
  })
})


/*
 * observation *
 ids
http://www.vedur.is/vedur/stodvar

params (mælistærðir)
'F','FX','FG','D','T','W','V','N','P','RH','SNC','SND','SED','RTE','TD','R'

time
1h | 3h

anytime
0 | 1


 * forecast *
 ids
http://www.vedur.is/vedur/stodvar

params (mælistærðir)
'F','FX','FG','D','T','W','V','N','P','RH','SNC','SND','SED','RTE','TD','R'


 * text *
 ids (svæði)
 [
  '2','3','5','6','7','9','10','11','12','14','27','30','31','32','33','34',
  '35','36','37','38','39','42'
 ]

*/
