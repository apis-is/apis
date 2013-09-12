var request = require('request'),
    parseString = require('xml2js').parseString,
    h = require('../../lib/helpers.js'),
    app = require('../../server');

/* ids (tegundir textaspáa) */
var validTypes = ['2','3','5','6','7','9','10','11','12','14','27','30','31','32','33','34','35','36','37','38','39','42'];

/* can later be used to include a readable version of the measurement names*/
var descriptions = {
  'F'   : { 'is': 'Vindhraði (m/s)',
            'en': 'Wind speed (m/s)'},
  'FX'  : { 'is': 'Mesti vindhraði (m/s)', 
            'en': 'Top wind speed (m/s)'},
  'FG'  : { 'is': 'Mesta vindhviða (m/s)', 
            'en': 'Top wind gust (m/s)'},
  'D'   : { 'is': 'Vindstefna', 
            'en': 'Wind direction'},
  'T'   : { 'is': 'Hiti (°C)', 
            'en': 'Air temperature (°C)'},
  'W'   : { 'is': 'Veðurlýsing', 
            'en': 'Weather description'},
  'V'   : { 'is': 'Skyggni (km)', 
            'en': 'Visibility (km)'},
  'N'   : { 'is': 'Skýjahula (%)', 
            'en': 'Cloud cover (%)'},
  'P'   : { 'is': 'Loftþrýstingur (hPa)', 
            'en': 'Air pressure'},
  'RH'  : { 'is': 'Rakastig (%)', 
            'en': 'Humidity (%)'},
  'SNC' : { 'is': 'Lýsing á snjó', 
            'en': 'Snow description'},
  'SND' : { 'is': 'Snjódýpt', 
            'en': 'Snow depth'},
  'SED' : { 'is': 'Snjólag', 
            'en': 'Snow type'},
  'RTE' : { 'is': 'Vegahiti (°C)', 
            'en': 'Road temperature (°C)'},
  'TD'  : { 'is': 'Daggarmark (°C)', 
            'en': 'Dew limit (°C)'},
  'R'   : { 'is': 'Uppsöfnuð úrkoma (mm/klst) úr sjálfvirkum mælum', 
            'en': 'Cumulative precipitation (mm/h) from automatic measuring units'}
};

/* Fetches the weather data and returns a JS object in a callback */
function getData(url, callback){
  request.get({
      headers: {'User-Agent': h.browser()},
      url: url
    }, function (error, response, body) {

      if (error) throw new Error(url + ' did not respond');
      
      parseString(body, function (err, result, title) {
        callback(result);
    });
  });
}

/* Root weather handler */
app.get('/weather', function (req, res, next) {

  return res.json(400, {results: [{ info: "This is an api for Icelandic weather reports and observations",
                                    endpoints: {
                                      forecasts: "/weather/forecasts/",
                                      observations: "/weather/observations/",
                                      texts: "/weather/texts/"
                                    } }]});

  next();
});


/* Initial weather handler */
app.get('/weather/:type/:lang?', function (req, res, next) {
  var lang = req.params.lang;

  // handle both ';' and ',' between stations, types and measurements
  if(req.query.stations)
    req.query.stations = req.query.stations.split(',').join(';');
  if(req.query.types)
    req.query.types = req.query.types.split(',').join(';');

  // make sure lang is correct
  if (lang && ['is','en'].indexOf(lang) == -1)
    return res.json(400, {results: [{ error: "incorrect language -- only 'is' or 'en' allowed" }]});

  next();
});

/* Forecasts */
app.get('/weather/forecasts/:lang?', function (req, res) {
  var lang     = req.params.lang || 'is',
  stations     = req.query.stations,
  url          = 'http://xmlweather.vedur.is/?op_w=xml&view=xml&type=forec&lang='+lang+'&ids='+stations+'&params='+Object.keys(descriptions).join(';'),
  syntax       = '/weather/forecasts[/(is|en)]?stations=<station1(,|;)...>',
  example      = '/weather/forecasts/is?stations=1,422';

  if (!stations) {
    return res.json(400,
      {results:
        [{error    : 'stations missing',
          syntax   : syntax,
          example  : example,
          moreInfo : 'http://www.vedur.is/um-vi/vefurinn/xml/'
        }]
      });
  }; 

  getData(url, function(forecasts){
    forecasts.results = forecasts.forecasts.station;
    delete forecasts.forecasts.station;
    delete forecasts.forecasts;
    h.deArrayfy(forecasts.results);
    for (var i = forecasts.results.length - 1; i >= 0; i--) {
      var forecast = forecasts.results[i];
      forecast.id = forecast.$.id;
      forecast.valid = forecast.$.valid;
      delete forecast.$;
    };
    return res.cache(600).json(forecasts);
  });
});

/* Observations */
app.get('/weather/observations/:lang?', function (req, res) {
  var lang     = req.params.lang || 'is',
  stations     = req.query.stations,
  time         = req.query.time,
  anytime      = req.query.anytime,
  url = 'http://xmlweather.vedur.is/?op_w=xml&view=xml&type=obs&lang='+lang+'&ids='+stations+'&params='+Object.keys(descriptions).join(';'),
  syntax       = '/weather/observations[/(is|en)]?stations=<station1(,|;)...>[&time=(1h|3h)][&anytime=(0|1)]',
  example      = '/weather/observations/is?stations=1,422&time=1h&anytime=0]';

  if (!stations) {
    return res.json(400,
      {results:
        [{error    : 'stations missing',
          syntax   : syntax,
          example  : example,
          moreInfo : 'http://www.vedur.is/um-vi/vefurinn/xml/'
        }]
      });
  };
  if (time) {
      url += '&time=' + time;
  };
  if (anytime) {
      url += '&anytime=' + anytime;
  };

  getData(url, function(observations){
    observations.results = observations.observations.station;
    delete observations.observations.station;
    delete observations.observations;
    h.deArrayfy(observations.results);
    for (var i = observations.results.length - 1; i >= 0; i--) {
      var observation = observations.results[i];
      observation.id = observation.$.id;
      observation.valid = observation.$.valid;
      delete observation.$;
    };
    return res.cache(600).json(observations);
  });
});

/* Texts */
app.get('/weather/texts/:lang?', function (req, res) {
  var lang = req.params.lang || 'is',
  types    = req.query.types,
  syntax   = '/weather/texts[/(is|en)]?types=<type1(,|;)...>',
  example  = '/weather/texts/is?types=5,6',
  url      = 'http://xmlweather.vedur.is/?op_w=xml&view=xml&type=txt&lang='+lang+'&ids='+types;

  if (!types) {
    return res.json(400,
      {results:
        [{error      : 'types missing',
          syntax     : syntax,
          example    : example,
          validTypes : validTypes,
          moreInfo   : 'http://www.vedur.is/um-vi/vefurinn/xml/'
        }]
      });
  };

  getData(url, function(texts){
    texts.results = texts.texts.text;
    delete texts.texts.text;
    delete texts.texts;
    h.deArrayfy(texts.results);
    for (var i = texts.results.length - 1; i >= 0; i--) {
      var text = texts.results[i];
      text.id = text.$.id;
      delete text.$;
      if (text.content instanceof Object) {
        delete text.content.br;
        text.content = text.content._;
      };
    };
    return res.cache(600).json(texts);
  });
});


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
['2','3','5','6','7','9','10','11','12','14','27','30','31','32','33','34','35','36','37','38','39','42']

*/