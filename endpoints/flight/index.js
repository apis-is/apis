exports.setup = function(){
	server.post({path: '/flight', version: '1.0.0'}, slash);
}

slash = function(req, res, next){

	var data = req.params;

	if(!data.type) data.type = '';
	if(!data.language) data.language = '';

	var url = '';

	if(data.type == 'departures' && data.language == 'is'){
		url = 'http://www.kefairport.is/Flugaaetlun/Brottfarir/';
	}else if(data.type == 'departures' && data.language == 'en'){
		url = 'http://www.kefairport.is/English/Timetables/Departures/';
	}else if(data.type == 'arrivals' && data.language == 'is'){
		url = 'http://www.kefairport.is/Flugaaetlun/Komur/';
	}else if(data.type == 'arrivals' && data.language == 'en'){
		url = 'http://www.kefairport.is/English/Timetables/Arrivals/';
	}else{
		res.json(200,{'error':'Wrong parameters given!'});
		return next();
	}

	request.get({
		headers: {'User-Agent': h.browser()},
		url: url
	}, function(error, response, body){
		if(error){
			res.json(500,{error:"Something went wrong"});
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

		if(req.header('Uptime-Test') == 'true'){
			h.logVisit('/flight', obj,true);
		}else{
			h.logVisit('/flight', obj,false);
		}
		res.json(200,obj)
		return next();
	});
}