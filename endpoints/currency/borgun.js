var request = require('request'),
	parseString = require('xml2js').parseString,
	app = require('../../server');

app.get('/currency/borgun', function(req, res) {

	request.get(
		{url: 'https://www.borgun.is/currency/Default.aspx?function=all'},
		function(err, response, xml){
			if(err || response.statusCode !== 200) {
				return res.status(500).json({ error: 'www.borgun.is refuses to respond or give back data' });
			}

			var currencies = [];
			parseString(xml, {explicitRoot: false}, function(err, result){

				if(err || result.Status[0].ResultCode[0] !== '0'){
					return res.status(500).json({ error: 'Unable to parse Borgun data: ' + JSON.stringify(err) });
				}

				for(var i=0; i<result.Rate.length; i++){
					var rate = result.Rate[i];
					currencies.push({
						currencyCode: rate.CurrencyCode[0],
						currencyDescription: rate.CurrencyDescription[0],
						currencyRate: parseFloat(rate.CurrencyRate[0]),
						country: rate.Country[0],
						countryEnglish: rate.CountryEnglish[0],
						countryCode: rate.CountryCode[0],
						rateDate: rate.RateDate[0]
					});
				}
				return res.json({ results: currencies });
			});
		}
	);
});
