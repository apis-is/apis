var request = require('request'),
    //moment = require('moment'),
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
  console.log(url);
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
/* Initial weather handler */
app.get('/weather/:type/:lang?', function (req, res, next) {
  var lang = req.params.lang;

  // handle both ';' and ',' between stations, types and measurements
  if(req.query.stations)
    req.query.stations = req.query.stations.split(',').join(';');
  if(req.query.measurements)
    req.query.measurements = req.query.measurements.split(',').join(';');
  if(req.query.types)
    req.query.types = req.query.types.split(',').join(';');

  // make sure lang is correct
  if (lang && ['is','en'].indexOf(lang) == -1)
    return res.json(400, { error: "incorrect language -- only 'is' or 'en' allowed" });

  next();
});

app.get('/weather/forecasts/:lang?', function (req, res) {
  var lang     = req.params.lang || 'is',
  stations     = req.query.stations,
  measurements = req.query.measurements,
  url          = 'http://xmlweather.vedur.is/?op_w=xml&view=xml&type=forec&lang='+lang+'&ids='+stations,
  syntax       = '/weather/forecasts[/(is|en)]?stations=<station1(,|;)...>[&measurements=<measurement1(,|;)...>]',
  example      = '/weather/forecasts/is?stations=1,422&measurements=F,D';

  if (!stations) {
    return res.json(400, {error             : 'stations missing',
                          syntax            : syntax,
                          example           : example,
                          validMeasurements : Object.keys(descriptions),
                          moreInfo          : 'http://www.vedur.is/um-vi/vefurinn/xml/' });
  };

  if (measurements) {
    url += '&params=' + measurements;
  };  

  getData(url, function(jsonData){
    return res.cache(1800).json(jsonData);
  });
});

app.get('/weather/observations/:lang?', function (req, res) {
  var lang     = req.params.lang || 'is',
  stations     = req.query.stations,
  time         = req.query.time,
  anytime      = req.query.anytime,
  measurements = req.query.measurements,
  syntax       = '/weather/observations[/(is|en)]?stations=<station1(,|;)...>[&measurements=<measurement1(,|;)...>][&time=(1h|3h)][&anytime=(0|1)]',
  example      = '/weather/observations/is?stations=1,422&measurements=F,D&time=1h&anytime=0]';

  if (!stations) {
    return res.json(400, {error             : 'stations missing',
                          syntax            : syntax,
                          example           : example,
                          validMeasurements : Object.keys(descriptions),
                          moreInfo          : 'http://www.vedur.is/um-vi/vefurinn/xml/' });
  };

  url = 'http://xmlweather.vedur.is/?op_w=xml&view=xml&type=obs&lang='+lang+'&ids='+stations;
  if (measurements) {
    url += '&params=' + measurements;
  };
  if (time) {
      url += '&time=' + time;
  };
  if (anytime) {
      url += '&anytime=' + anytime;
  };

  getData(url, function(jsonData){
    return res.cache(1800).json(jsonData);
  });
});

app.get('/weather/texts/:lang?', function (req, res) {
  var lang = req.params.lang || 'is',
  types    = req.query.types,
  syntax   = '/weather/texts[/(is|en)]?types=<type1(,|;)...>',
  example  = '/weather/texts/is?types=5,6',
  url      = 'http://xmlweather.vedur.is/?op_w=xml&view=xml&type=txt&lang='+lang+'&ids='+types;

  if (!types) {
    return res.json(400, {error      : 'types missing',
                          syntax     : syntax,
                          example    : example,
                          validTypes : validTypes,
                          moreInfo   : 'http://www.vedur.is/um-vi/vefurinn/xml/' });
  };

  getData(url, function(jsonData){
    return res.cache(1800).json(jsonData);
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