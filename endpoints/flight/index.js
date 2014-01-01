var request = require('request'),
	$ = require('jquery'),
	h = require('apis-helpers'),
	app = require('../../server');

app.get('/flight', function(req, res){
	var data = req.query,
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
		url = 'http://www.kefairport.is/English/Timetables/Arrivals/';
	}

	request.get({
		headers: {'User-Agent': h.browser()},
		url: url
	}, function(error, response, body){
		if(error || response.statusCode !== 200)
			return res.json(500,{error:'www.kefairport.is refuses to respond or give back data'});

		try{
			var data = $(body);	
		}catch(error){
			return res.json(500,{error:'Could not parse body'});
		}

		var	obj = { results: []};

		var fields = ['date','flightNumber','airline','to','from','plannedArrival','realArrival','status'];
		
		data.find('table tr').each(function(key){
			if(key !== 0){
				var flight = {};
				if(data.type === 'departures') {
					flight = {
						'date': '',
						'flightNumber':'',
						'airline':'',
						'to': '',
						'plannedArrival': '',
						'realArrival': '',
						'status': ''
					}
				}
				else {
					flight = {
						'date': '',
						'flightNumber':'',
						'airline':'',
						'from': '',
						'plannedArrival': '',
						'realArrival': '',
						'status': ''
					}
				}
				
				$(this).find('td').each(function(key){
					var val = $(this).html();
					if(val != '' && val != 0){ // Perform check and add to flight array if it passes
						flight[fields[key]] = val;

					}
				});
				obj.results.push(flight);
			}
		});
		
		return res.cache(3600).json(obj);
	});
});
