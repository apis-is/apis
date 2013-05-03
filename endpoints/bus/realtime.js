var h = require('../../lib/helpers.js'),
	request = require('request');

exports.setup = function(server){
	server.post({path: '/bus/realtime', version: '1.0.0'}, realtime); //Old
	server.get({path: '/bus/realtime', version: '1.0.0'}, realtime);
}

var realtime = function(req, res, next){
	var data = req.params;

	request('http://straeto.is/bitar/bus/livemap/json.jsp', function (error, response, body) {
		if(error || response.statusCode !== 200) {
			throw new Error("The bus api is down or refuses to respond");
		}

		try{
			obj = JSON.parse(body);
		}catch(error){
			throw new Error("Something is wrong with the data provided from the data source");
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

	    	if(error || response.statusCode !== 200) {
				throw new Error("The bus api is down or refuses to respond");
			}

			try{
    			var data = JSON.parse(body);
			}catch(e){
				throw new Error("Something is wrong with the data provided from the data source");
			}

    		var routes = data.routes;

    		var objRoutes = {
    			results: []
    		};
    		routes.forEach(function(route, key){

    			var objRoute = {
                    busNr: route.id || "", // will be undefined if none are active
    				busses: []
    			}; 
                objRoutes.results.push(objRoute);

                if (!route.busses) return; // No busses active, eg. after schedule

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

    		});

    		res.json(200,objRoutes);
    		return next();
	    });
	});
}