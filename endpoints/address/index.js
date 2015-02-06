var request = require('request');
var h = require('apis-helpers');
var app = require('../../server');
var _ = require('underscore');

app.get('/address/:address?', function(req, res) {
    var address = req.query.address || req.params.address || '';

    if(address === '') {
      return res.json(431, {error: 'Please provide a valid address to lookup'});
    }

    address = address.replace(' ', '+');

    request.get({
      headers: {'User-Agent': h.browser()},
      url: 'https://api.postur.is/PosturIs/ws.asmx/GetPostals?address=' + address
    }, function(error, response, body) {
      if(error || response.statusCode !== 200) {
        return res.json(500,{error:'www.postur.is refuses to respond or give back data'});
      }

      // There is a enclosing () in the response
      var data  = JSON.parse(body.replace(/[()]/g, ''));
      data = _.flatten(data);

      var results = _.map(data, function(elem) {
        return {
          street: elem.Gata,
          house: elem.Husnumer,
          zip: elem.Postnumer,
          city: elem.Sveitafelag,
          apartment: elem.Ibud,
          letter: elem.Stafur
        };
      });

      return res.cache().json({ results: results });
    });
});
