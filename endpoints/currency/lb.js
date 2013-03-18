var parseString = require('xml2js').parseString;

var getCurrency = function(req, res, next){
  res.charSet = 'utf8';

  // A = Almennt gengi, S = Seðlagengi
  var type = req.params['type'] || 'A';

  request.get({
    url: 'http://www.landsbankinn.is/modules/markets/services/XMLGengi.asmx/NyjastaGengiByType?strTegund=' + type
  }, function(err, response, xml) {
    if (err) {
      res.json(500, { error: 'Something went wrong' });
      return next();
    }

    var currencies = [];
    parseString(xml, { explicitRoot: false }, function(err, result) {
      var arr = result.GjaldmidillRow;
      for (var i = 0, currency; currency = arr[i]; i++) {
        currencies.push({
          shortName: currency.Mynt,
          longName: currency.Heiti,
          value: currency.MidValue,
          askValue: currency.Kaup,
          bidValue: currency.Sala,
          changeCur: currency.Breyting,
          changePer: (parseFloat(currency.Breyting) / parseFloat(currency.Midgengi)).toFixed(2)
        });
      }
      res.json(200, { results: currencies });
      next();
    });
  });
};

exports.setup = function(){
  server.get({path: '/currency/lb', version: '1.0.0'}, getCurrency);
};