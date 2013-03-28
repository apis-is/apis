exports.setup = function() {
	server.get({path: '/currency/m5', version: '1.0.0'}, getCurrencies);
};

var getCurrencies = function (req, res, next) {
	res.charSet = 'utf8';

	var currencyNames = {
		s: ['USD','DKK','EUR','JPY','CAD','NOK','GBP','CHF','SEK','TWI','XDR','ISK'],
		l: ['Bandarískur dalur','Dönsk króna','Evra','Japanskt jen','Kanadískur dalur','Norsk króna','Sterlingspund','Svissneskur franki','Sænsk króna','Gengisvísitala','SDR','Íslensk króna']
	};

	request.get({
		headers: { 'User-Agent': h.browser() },
		url: 'http://www.m5.is/?gluggi=gjaldmidlar'
	}, function(err, response, body) {
		if (err) {
			res.json(500, { error:"Something went wrong on the server" });
			return next();
		}

		var data = $(body),
    	currencies = [];

		data.find('.table-striped tr').each(function () {
			var tds = $(this).find('td'),
        		name = tds.eq(0).text();
      		
      		name && currencies.push({
				shortName: name,
				longName: h.currency[name].long,
				value: parseFloat(tds.eq(2).text().replace(',', '.')),
				askValue: 0,
				bidValue: 0,
				changeCur: parseFloat(tds.eq(4).text().replace(',', '.')),
				changePer: parseFloat(tds.eq(5).text().replace(/\((.*)%\)/, '$1').replace(',', '.'))
			});
		});

		res.json(200, { results: currencies });
		return next();
	});
};