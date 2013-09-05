var request = require('request'),
	parseString = require('xml2js').parseString,
	app = require('../../server');

app.get('/currency/lb', function(req, res){
	// A = Almennt gengi, S = Seðlagengi
	var type = req.params['type'] || 'A';

	request.get({
		url: 'http://www.landsbankinn.is/modules/markets/services/XMLGengi.asmx/NyjastaGengiByType?strTegund=' + type
		}, function(err, response, xml) {
			if(err || response.statusCode !== 200)
				return res.json(500,{error: 'www.landsbankinn.is refuses to respond or give back data'});

			var currencies = [];
			parseString(xml, { explicitRoot: false }, function(err, result) {
				var arr = result.GjaldmidillRow;
				for (var i = 0, currency; currency = arr[i]; i++) {
					currencies.push({
						shortName: currency.Mynt[0],
						longName: currency.Heiti[0],
						value: parseFloat(currency.Midgengi),
						askValue: parseFloat(currency.Sala),
						bidValue: parseFloat(currency.Kaup),
						changeCur: parseFloat(currency.Breyting[0]),
						changePer: parseFloat((parseFloat(currency.Breyting) / parseFloat(currency.Midgengi)).toFixed(2))
					});
				}
				return res.json({ results: currencies });
			});
		}
	);
});
