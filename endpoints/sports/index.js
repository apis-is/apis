/*****************************
 * Name:     Sports API
 * Author:   Jón Orri Kristjánsson
 * Created:  March 2014
 */

var request, parseString, h, app, cheerio;

/** Requires **/
request = require('request'),
parseString = require('xml2js').parseString,
h = require('apis-helpers'),
app = require('../../server'),
cheerio = require('cheerio'),
$ = require('jquery'),

/** Variable initialization **/

/* Fetches the sports data and returns a JS object in a callback */
function getJsonData(url, callback){
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

/** Routes **/

/* Root sports handler */
app.get('/sports', function (req, res, next) {

  return res.json(
    {
      results: [
        {
          info: 'This is an api for Ielandic sports events',
          endpoints: {
            football: '/sports/football/',
            handball: '/sports/handball/'
          }
        }
      ]
    }
  );
  next();
});

/* Football */
app.get('/sports/football', function (req, res) {
  var url = 'http://www.ksi.is/mot/naestu-leikir/';
  request.get({ headers: {'User-Agent': h.browser()}, url: url },
    function(error, response, body) {
      if(error || response.statusCode !== 200) {
        return res.json(500,{error:'www.ksi.is refuses to respond or give back data'});
      }

      try {
        var data = $(body);	
      } catch(error) {
        return res.json(500,{error:'Could not parse body'});
      }

      var obj = { results: []};
      var fields = ['counter','date','time','tournament', 'location', 'homeTeam', 'awayTeam'];
      try {
        data.find('#leikir-tafla tr').not(':first').each(function(key) {
          if (key !== 0) {
            var game = {};
        	  $(this.cells).each(function(key2) {
                var val = $(this).text();
                if (val && val.trim() && val !== '' && val !== 0 && val !== '\t' && val !== '\n') {
                  game[fields[key2]] = val;
                }
            });

            // Checking whether it has the necessary fields
            if (!$.isEmptyObject(game) && game.counter && game.date && game.time && game.tournament && game.location && game.homeTeam && game.awayTeam)
              obj.results.push(game);
          }
        });
      } catch(error) {
        return res.json(500, {error: 'Could not parse the game data'});
      }

      return res.json(obj);
    });
});

app.get('/sports/handball', function (req, res) {
  var url = 'http://hsi.is/library/motamal/naestu.htm';
  request.get({ headers: {'User-Agent': h.browser()}, url: url},
    function(error, response, body) {
      if(error || response.statusCode !== 200) {
        return res.json(500, {error:'www.hsi.is refuses to respond or give back data'});
      }

      try {
        var data = $(body);
      } catch(error) {
        return res.json(500, {error:'Could not parse body'});
      }

      var obj = {results: []};
      var fields = ['Date', 'Time', 'Tournament', 'Venue', 'Teams'];

      try {
        data.find('table').eq(1).find('tr').not(':first').each(function(key) {
          if (key !== 0) {
            var game = {};
            $(this.cells).each(function(key2) {
              var val = $(this).text().trim();
              if (val && val !== '' && val !== 0) {
                game[fields[key2]] = val;
              }
            });

            if (!$.isEmptyObject(game) && game.Date && game.Time && game.Tournament && game.Venue && game.Teams)
              obj.results.push(game);
          }
        });
      } catch(error) {
        return res.json(500, {error: 'Could not parse the game data: ' + error});
      }

      return res.json(obj);
    });
});
