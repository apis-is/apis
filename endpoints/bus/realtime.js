exports.setup = function(){
	server.post({path: '/bus/realtime', version: '1.0.0'}, realtime);
}

realtime = function(req, res, next){
	var data = req.params;

	request('http://straeto.is/bitar/bus/livemap/json.jsp', function (error, response, body) {
		if(error) {
			h.logError(error,error.stack);
			res.json(500,{error:'Something went wrong',code:3});
			return next();
		}
		if(response.statusCode !== 200){
			h.logError('Wrong status code in /bus/realtime:'+res.statusCode,'');
			res.json(500,{error:"Something went wrong code 1",code:4});
			return next();
		}

		try{
			obj = JSON.parse(body);
		}catch(error){
			h.logError('Something is wrong with the data provided from the data source');
			res.json(500,{error:"Something is wrong with the data provided from the data source"});
			return next();
		}

		var activeBusses = [],
			requestedBusses = [];

		obj.routes.forEach(function(object, key){
    		activeBusses.push(object.id);
    	});

	    if(data.busses){ //Post busses = 1,2,3,4,5
	    	requestedBusses = data.busses.split(",");

	    	for(var i in requestedBusses){ //Prevent requested to busses that are not available
	    		if(activeBusses.indexOf(requestedBusses[i]) == -1){
					requestedBusses.splice(requestedBusses.indexOf(requestedBusses[i]),1);
				}
	    	}
	    }else{
	    	//No bus was posted, use all active busses
	    	requestedBusses = activeBusses;
	    }

	    objString = requestedBusses.join('%2C');

	    request('http://straeto.is/bitar/bus/livemap/json.jsp?routes='+objString, function (error, response, body) {

	    	if(error) {
				h.logError(error,error.stack);
				res.json(500,{error:'Something went wrong',code:3});
				return next();
			}
			if(response.statusCode !== 200){
				h.logError('Wrong status code in /bus/realtime:'+res.statusCode,'');
				res.json(500,{error:"Something went wrong code 1",code:4});
				return next();
			}

			try{
    			var data = JSON.parse(body);
			}catch(e){
				res.json(500,{error:"Something went wrong"});
				return next();
			}



    		var routes = data.routes;

    		var objRoutes = {
    			results: []
    		};
    		routes.forEach(function(route, key){

    			var objRoute = {
    				busNr: route.id,
    				busses: []
    			}; 
    			route.busses.forEach(function(bus, key){

    				var location = h.ISN93_To_WGS84(bus.X,bus.Y),
    					oneRoute = {
    					'unixTime': Date.parse(bus.TIMESTAMPREAL)/1000,
    					'x': location.lat,
    					'y': location.lng,
    					'from': bus.FROMSTOP,
    					'to': bus.TOSTOP
    				};
    				objRoute.busses.push(oneRoute);

    			});

    			objRoutes.results.push(objRoute);
    		});

    		if(req.header('Uptime-Test') == 'true'){
				h.logVisit('/bus/search', objRoutes,true);
			}else{
				h.logVisit('/bus/search', objRoutes,false);
			}
    		res.json(200,objRoutes)
    		return next();
	    });
	});
}