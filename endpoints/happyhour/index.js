var request = require('request');
var h = require('apis-helpers');
var app = require('../../server');
var _ = require('underscore');

app.get('/happyhour', function(req, res) {
    request.get({
      headers: {'User-Agent': h.browser()},
      url: 'http://appyhour.herokuapp.com/iceland/'
    }, function(error, response, body) {
      if(error || response.statusCode !== 200) {
        return res.json(500,{error:'appyhour.herokuapp.com refuses to respond or give back data'});
      }

      var data = _.chain(JSON.parse(body))
        .map(function(point) {
          return _.omit(point.fields, 'base_image', 'image', 'is_sponsored');
        })
        ._wrapped;

      return res.cache().json({ results: data });
    });
});
