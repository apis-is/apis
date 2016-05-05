/* eslint-disable no-param-reassign */

import express from 'express';
import request from 'request';
import h from 'apis-helpers';
import { parseString } from 'xml2js';
import cheerio from 'cheerio';
import url from 'url';

/* Fetches the weather data and returns a JS object in a callback */
function getJsonData(dataUrl, callback) {
  request.get({
    headers: { 'User-Agent': h.browser() },
    url: dataUrl,
  }, (error, response, body) => {
    if (error) {
      throw new Error(`${dataUrl} did not respond`);
    }

    parseString(body, (err, result) => {
      callback(result);
    });
  });
}

/*
 * ids (tegundir textaspáa)
 * can later be used to include a readable version of the measurement names
 */
const validTypes = [
  '2', '3', '5', '6', '7', '9', '10', '11', '12', '14', '27', '30', '31', '32',
  '33', '34', '35', '36', '37', '38', '39', '42',
];

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
    ftime: 'Tími',
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
    ftime: 'Time',
  },
};

export default (() => {
  const app = express();

  app.get('/', (req, res) => {
    return res.json({
      results: [{
        info: 'This is an api for Icelandic weather reports and observations',
        version: 2,
        endpoints: {
          forecasts: '/weather/v2/forecasts/',
          observations: '/weather/v2/observations/',
          texts: '/weather/v2/texts/',
        },
        other: {
          availableStations: '/weather/v2/stations',
        },
      }],
    });
  });

  app.get('/stations', (req, res) => {
    const stationURL = 'http://www.vedur.is/vedur/stodvar?t=3';
    request(stationURL, { timeout: 1000 }, (error, response, body) => {
      // TODO: When throwing a error the app just crashes. We need to handle
      // this case better.
      if (error) {
        throw new Error('Error when fetching stations from vedur.is');
      }

      // What happens if we cannot load the DOM in cheerio?
      const $ = cheerio.load(body);

      const hrefs = $(".listtable td a:contains('A')");

      const items = hrefs.map((_, elem) => {
        const $elem = $(elem);

        // We need to replace '#' with '?' to be able to parse the querystring
        // in the url.
        //
        // For some reason vedur.is has their urls with the hash like so:
        //
        //   /vedur/athuganir/kort/nordurland_eystra/#group=15&station=33357
        //
        // making it not possible to parse using the url standard lib:
        // https://nodejs.org/docs/latest/api/url.html

        const validHref = $elem.attr('href').replace('#', '?');
        const parsedUrl = url.parse(validHref, true);
        const id = parsedUrl.query.station;

        const name = $elem.attr('title').split('-')[0].trim();

        return {
          id,
          name,
        };
      }).get();

      return res.cache(86400).json({ results: items });
    });
  });

  app.get('/:stations/forecasts', (req, res) => {
    const stations = req.params.stations;
    if (!stations) {
      return res.status(400).json({
        results: [{
          error: 'stations missing',
          syntax: '/weather/v2/forecasts?lang=(is|en)&stations=<station1(,|;)...>',
          example: '/weather/v2/forecasts/?lang=is&stations=1,422',
          moreInfo: 'http://www.vedur.is/um-vi/vefurinn/xml/',
        }],
      });
    }
    const lang = req.query.lang || 'is';
    const selectedMeasurements = measurements[lang];
    const params = Object.keys(measurements.is).join(';');

    // TODO: Replace with URL builder
    const urlToFetch = [
      'http://xmlweather.vedur.is/?',
      'op_w=xml&',
      'view=xml&',
      'type=forec&',
      `lang=${lang}`,
      `&ids=${stations}`,
      `&params=${params}`,
    ].join('');

    getJsonData(urlToFetch, (providedForecasts) => {
      // make some nice changes to the object for cleaner JSON
      const forecasts = Object.assign({}, providedForecasts);
      // TODO: Replace mutation with immutability
      forecasts.results = forecasts.forecasts.station;
      delete forecasts.forecasts.station;
      delete forecasts.forecasts;
      h.deArrayfy(forecasts.results);

      forecasts.results.forEach((result) => {
        result.id = result.$.id;
        result.valid = result.$.valid;
        delete result.$;
        if (lang === 'is') {
          result.forecast.forEach((f) => {
            Object.keys(f).forEach((m) => {
              f[m] = f[m].replace(/,/g, '.');
            });
          });
        }
      });

      // TODO: Remove immutability.
      forecasts.results = forecasts.results.map(result => {
        return result.forecast.map(forecast => {
          const obj = {};
          Object.keys(forecast).forEach(key => {
            if (selectedMeasurements[key]) {
              obj[selectedMeasurements[key]] = forecast[key];
            } else {
              obj[key] = forecast[key];
            }
          });
          return obj;
        });
      });

      return res.cache(300).json(forecasts);
    });
  });

  app.get('/observations', (req, res) => {
    // XXX: Stations should probably be parameters rather than a query.
    const stations = req.query.stations;
    if (!stations) {
      return res.status(400).json({
        results: [{
          error: 'stations missing',
          syntax: (
            '/weather/observations?stations=<station1(,|;)...>[&lang=(is|en)][&time=(1h|3h)][&anytime=(0|1)]'
          ),
          example: '/weather/observations?=is&stations=1,422&time=1h&anytime=0',
          moreInfo: 'http://www.vedur.is/um-vi/vefurinn/xml/',
        }],
      });
    }
    const lang = req.query.lang || 'is';
    const descriptions = (
      req.query.descriptions === '' ||
      req.query.descriptions === '1' ||
      req.query.descriptions === 'true'
    );
    const time = req.query.time;
    const anytime = req.query.anytime;
    const params = Object.keys(measurements.is).join(';');

    // XXX: Build this URL better.
    let urlToFetch = [
      'http://xmlweather.vedur.is/',
      '?op_w=xml',
      '&view=xml',
      '&type=obs',
      `&lang=${lang}`,
      `&ids=${stations}`,
      `&params=${params}`,
    ].join('');
    if (time) {
      urlToFetch += `&time=${time}`;
    }
    if (anytime) {
      urlToFetch += `&anytime=${anytime}`;
    }

    getJsonData(urlToFetch, (observations) => {
      // make some nice changes to the object for cleaner JSON
      observations.results = observations.observations.station;
      delete observations.observations.station;
      delete observations.observations;
      h.deArrayfy(observations.results);
      for (let i = observations.results.length - 1; i >= 0; i--) {
        const observation = observations.results[i];
        observation.id = observation.$.id;
        observation.valid = observation.$.valid;
        delete observation.$;
        // fix decimal
        if (lang === 'is') {
          Object.keys(observation).forEach((m) => {
            observation[m] = observation[m].replace(/,/g, '.');
          });
        }
      }
      if (descriptions) {
        observations.descriptions = measurements[lang];
      }
      return res.cache(300).json(observations);
    });
  });

  app.get('/texts/:type/', (req, res) => {
    const type = req.params.type;
    if (!type) {
      return res.status(400).json({
        results: [{
          error: 'type missing',
          syntax: '/weather/texts/:type/?lang=(is|en)',
          example: '/weather/texts/5/?lang=is',
          validTypes,
          moreInfo: 'http://www.vedur.is/um-vi/vefurinn/xml/',
        }],
      });
    }
    const lang = req.query.lang || 'is';
    const urlToFetch = `http://xmlweather.vedur.is/?op_w=xml&view=xml&type=txt&lang=${lang}&ids=${type}`;

    getJsonData(urlToFetch, (texts) => {
      const result = texts.texts.text[0];
      return res.cache(300).json({
        results: {
          id: result.$.id,
          creation: result.creation[0],
          content: result.content[0],
          title: result.title[0],
          valid_from: result.valid_from[0],
          valid_to: result.valid_to[0],
        },
      });
    });
  });

  return app;
})();
