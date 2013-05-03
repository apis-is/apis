var request = require('request');
var parseString = require('xml2js').parseString;

exports.setup = function(server){
 	server.get({path: '/currency/lb', version: '1.0.0'}, getCurrencies);
};

var getCurrencies = function(req, res, next){
	res.charSet = 'utf8';
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

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
						shortName: currency.Mynt[0],
						longName: currency.Heiti[0],
						value: parseFloat(currency.Midgengi),
						askValue: parseFloat(currency.Kaup),
						bidValue: parseFloat(currency.Sala),
						changeCur: parseFloat(currency.Breyting[0]),
						changePer: parseFloat((parseFloat(currency.Breyting) / parseFloat(currency.Midgengi)).toFixed(2))
					});
				}
				res.json(200, { results: currencies });
				return next();
			});
		}
	);
};

exports.getCurrencies = getCurrencies;