var request = require('request');
var $ = require('cheerio');
var h = require('apis-helpers');
var app = require('../../server');


app.get('/car', function(req, res){
	var carPlate = req.query.number || req.query.carPlate || '';

	if(!carPlate)
		return res.status(431).json({error:'Please provide a valid carPlate to lookup'});

	// Encode carPlate so that Icelandic characters will work
	carPlate = encodeURIComponent(carPlate);

	var url = 'http://www.samgongustofa.is/umferd/okutaeki/okutaekjaskra/uppfletting?vq=' + carPlate;

	request.get({
		headers: {'User-Agent': h.browser()},
		url: url
	}, function(error, response, body) {
		if(error || response.statusCode !== 200) {
			return res.status(500).json({error:'www.samgongustofa.is refuses to respond or give back data'});
		}

		var data = $(body);

		var obj = {
			results: []
		};

		var fields = [];

		data.find('.vehicleinfo ul li').each(function() {
			var val = $(this).find('span').text();

			fields.push(val);
		});

		if (fields.length > 0) {
			obj.results.push({
				type: fields[0],
				subType: fields[0].substring(fields[0].indexOf('-')+2,fields[0].indexOf('(')-1),
				color: fields[0].substring(fields[0].indexOf('(')+1,fields[0].indexOf(')')),
				registryNumber: fields[1],
				number: fields[2],
				factoryNumber: fields[3],
				registeredAt: fields[4],
				pollution: fields[5],
				weight: fields[6],
				status: fields[7],
				nextCheck: fields[8]
			});
		}

		return res.cache().json(obj);
	});
});
