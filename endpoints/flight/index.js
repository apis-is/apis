var request = require('request');
var $ = require('jquery');
var h = require('../../lib/helpers.js');

exports.setup = function(server){
	server.post({path: '/flight', version: '1.0.0'}, slash); //Old

	server.post({path: '/flight', version: '1.0.0'}, slash);
}

var slash = function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var data = req.params,
		url = '';

	if(!data.type) data.type = '';
	if(!data.language) data.language = '';

	if(data.type == 'departures' && data.language == 'is'){
		url = 'http://www.kefairport.is/Flugaaetlun/Brottfarir/';
	}else if(data.type == 'departures' && data.language == 'en'){
		url = 'http://www.kefairport.is/English/Timetables/Departures/';
	}else if(data.type == 'arrivals' && data.language == 'is'){
		url = 'http://www.kefairport.is/Flugaaetlun/Komur/';
	}else if(data.type == 'arrivals' && data.language == 'en'){
		url = 'http://www.kefairport.is/English/Timetables/Arrivals/';
	}else{
		res.json(431,{'error':'Wrong parameters given!'});
		return next();
	}

	request.get({
		headers: {'User-Agent': h.browser()},
		url: url
	}, function(error, response, body){
		if(error){
			res.json(500,{error:"Something went wrong on the server"});
			return next();
		}
		var data = $(body),
			obj = { results: []};

		var fields = ['date','flightNumber','to','plannedArrival','realArrival','status'];
		
		data.find('table tr').each(function(key){
			if(key !== 0){
				var flight = {
					'date': '',
					'flightNumber':'',
					'to': '',
					'plannedArrival': '',
					'realArrival': '',
					'status': ''
				}
				$(this).find('td').each(function(key){
					var val = $(this).html();
					if(val != '' && val != 0){ //Perform check and add to car array if it passes
						flight[fields[key]] = val;

					}
				});
				obj.results.push(flight);
			}
		});

		h.logVisit('/flight', obj,false);
		
		res.json(200,obj)
		return next();
	});
}