var request = require('request'),
	$ = require('jquery'),
	h = require('../../lib/helpers.js'),
	app = require('../../server');

app.get('/car', function(req, res){
	var carPlate = req.query.number || req.query.carPlate || '';
	
	if(!carPlate)
		return res.json(431,{error:'Please provide a valid carPlate to lookup'});

	request.get({
		headers: {'User-Agent': h.browser()},
		url: 'http://ww2.us.is/upplysingar_um_bil?vehinumber='+carPlate
	}, function(error, response, body){
		if(error || response.statusCode !== 200) {
			return res.json(500,{error:'www.us.is refuses to respond or give back data'});
		}
		var data = $(body),
			obj = { results: []},
			car = {
				'registryNumber': 0,
				'number': 0,
				'factoryNumber': 0,
				'type': '',
				'subType': '',
				'color': '',
				'registeredAt': '',
				'status': '',
				'nextCheck': '',
				'pollution': '',
				'weight': 0
			}

		var fields = ['registryNumber','number','factoryNumber','type','subType','color','registeredAt','status','nextCheck','pollution','weight'];
		var nothingFound = data.find('table tr td').html();
		if( nothingFound.indexOf('Ekkert ökutæki fannst') == -1){
			//Found something
			data.find('table tr').each(function(key){
				var val = $(this).find('b').html();
				if(val != '' && val != 0){ //Perform check and add to car array if it passes
					car[fields[key]] = val;
				}
			});
			obj.results.push(car);
		}
		return res.json(obj);
	});
});