var request = require('request');
var h = require('../../lib/helpers.js');

exports.setup = function(server){
	server.post({path: '/bus/search', version: '1.0.0'}, search);
}

var search = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.json(404,{error:"This api endpoint has been closed temporarily, because Bus.is changed it's markup."});
	return next();
}

realtime = function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  	
	var data = req.params;

	request('http://straeto.is/bitar/bus/livemap/json.jsp', function (error, response, body) {
		if(error) {
			res.json(500,{error:'Something went wrong',code:3});
			return next();
		}
		if(response.statusCode !== 200){
			res.json(500,{error:"Something went wrong code 1",code:4});
			return next();
		}

		try{
			obj = JSON.parse(body);
		}catch(error){
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
				res.json(500,{error:'Something went wrong',code:3});
				return next();
			}
			if(response.statusCode !== 200){
				res.json(500,{error:"Something went wrong code 1",code:4});
				return next();
			}

    		var data = JSON.parse(body),
    			routes = data.routes;

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

    		res.json(200,objRoutes)
    		return next();
	    });
	});
}