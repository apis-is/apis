exports.setup = function(){
	server.post({path: '/car', version: '1.0.0'}, slash);
}

slash = function(req, res, next){
	var data = req.params;
	
	if(!data.number){
		h.logError(error,error.stack);
		res.json(431,{error:'Please provide a valid number to lookup'});
		return next();
	}

	request.get({
		headers: {'User-Agent': h.browser()},
		url: 'http://www.us.is/upplysingar_um_bil?vehinumber='+data.number
	}, function(error, response, body){
		if(error){
			res.json(500,{error:"Something went wrong"});
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
		
		if(req.header('Uptime-Test') == 'true'){
			h.logVisit('/car', obj,true);
		}else{
			h.logVisit('/car', obj,false);
		}
		res.json(200,obj)
		return next();
	});
}