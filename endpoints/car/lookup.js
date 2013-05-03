var request = require('request');
var $ = require('jquery');
var h = require('../../lib/helpers.js');

exports.setup = function(server){
	server.post({path: '/car', version: '1.0.0'}, lookup); //Old

	server.get({path: '/car', version: '1.0.0'}, lookup);
}

var lookup = function(req, res, next){

	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  	
	var data = req.params;
	
	if(!data.number){
		res.json(431,{error:'Please provide a valid number to lookup'});
		return next();
	}

	request.get({
		headers: {'User-Agent': h.browser()},
		url: 'http://www.us.is/upplysingar_um_bil?vehinumber='+data.number
	}, function(error, response, body){
		if(error){
			res.json(500,{error:"Something went wrong on the server"});
			return next();
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

		var fields = ['registryNumber','number','factoryNumber','type','subType','color','registeredAt','status','nextCheck','pollution','weight'],

			nothingFound = data.find('table tr td').html();

		if(nothingFound.indexOf('Ekkert ökutæki fannst') == -1){
			//Found something
			data.find('table tr').each(function(key){
				var val = $(this).find('b').html();
				if(val != '' && val != 0){ //Perform check and add to car array if it passes
					car[fields[key]] = val;
				}
			});
			obj.results.push(car);
		}
		
		res.json(200,obj)
		return next();
	});
}