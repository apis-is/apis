var request = require('request');
var h = require('../../lib/helpers.js');

exports.setup = function(server){
	server.post({path: '/bus/search', version: '1.0.0'}, search);
	server.post({path: '/bus/realtime', version: '1.0.0'}, realtime);
}

search = function(req, res, next) {
	res.json(404,{error:"This api endpoint has been closed temporarily, because Bus.is changed it's markup."});
	return next();

	/*
	//Old non working code. May be used for future reference
	var data = req.params;

	res.charSet = 'utf8';

	function startBusScraper(d){
		var url = 'http://www.straeto.is/leit?from='+ d.from +'&to='+ d.to +'&hour='+ d.hour +'&min='+ d.min +'&timetype='+ d.timetype +'&day='+ d.day +'&routeCount=3'
		console.log(url)
		scraper({
		'uri': url , 
		'headers': { 
			'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
		}}, function(error, $) {
			if (error) {
				h.logError(error,error.stack);
				res.json(200,{error:'Something went wrong',code:3});
				return next();
			}

			if($('#pointb_sel').length > 0){ //To
				console.log($('#pointb_sel').find('option').html())
				startBusScraper({
					from: d.from,
					to: $('#pointb_sel').find('option').html(),
					hour: d.hour,
					min: d.min,
					timetype: d.timetype,
					day: d.day
				})
			}else if($('#pointb_sel').length > 0){ //To
				console.log($('#pointb_sel').find('option').html())
			}else{

				obj = { results: []};

				$('.routedescr').each(function() {

					var row = {
			        		'name': $(this).find('h3 > span').html(), //Tillaga nr
			        		'vagons': $(this).find('h3 > strong').html().replace(/<(?:.|\n)*?>/gm, ''), //Vagnar
			        		'totalTime': $(this).find('.totalruntime').html(), //Heildar tími
			        		'waypoints': [] //Stopp og þ.h.

			        	};

			        	$(this).find('tr').each(function() {

			        		var waypoint = {
			        			fromOrToName: '',
			        			name: $(this).find('.col2').html().replace(/<(?:.|\n)*?>/gm, ''),
			        			time: $(this).find('.col3').html(),
			        			travelingType: '',
			        		};

			        		var fromAndTo = $(this).find('.col1').html().replace(/<(?:.|\n)*?>/gm, '');

			        		if(fromAndTo != '&nbsp;'){
			        			waypoint.fromOrToName = fromAndTo;
			        		}

			        		var traveling = $(this).find('.col4').html().replace(/<(?:.|\n)*?>/gm, '');

			        		if(traveling != '&nbsp;'){
			        			waypoint.travelingValue = traveling;

			        			var classes = $(this).find('.col4').attr('class');

			        			classes =classes.split(" ");

			        			if(classes[1]){
			        				waypoint.travelingType = classes[1];
			        			}
			        		}

			        		if($(this).find('.col2').html().indexOf('<!-- waitPeriod:  -->') > 0){
			        			waypoint.waitHere = true;
			        		}

			        		row.waypoints.push(waypoint);

			        	});
					obj.results.push(row);
				});

			}

			res.json(200,obj);
			h.logVisit('/bus/search', obj);
			return next();
		});	
	}

	if((data.fromLat && data.fromLng) && (data.toLat && data.toLng)){
		var xy = h.WGS84_To_ISN93(data.fromLat,data.fromLng);
		request.get({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: 'http://ja.is/kort/bestpath/?fX='+xy.x+'&fY='+xy.y+'&tX='+xy.x+'&tY='+xy.y+'&d=10.88'
		}, function(error, response, body){
			if(error){
				res.json(200,{success:false});
				return next();
			}

			body = JSON.parse(body);
			var from = h.deFormat(body.dir[0].n)

			
			var xy2 = h.WGS84_To_ISN93(data.toLat,data.toLng);
			request.get({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'http://ja.is/kort/bestpath/?fX='+xy2.x+'&fY='+xy2.y+'&tX='+xy2.x+'&tY='+xy2.y+'&d=10.88'
			}, function(error, response, body){
				if(error){
					res.json(200,{success:false});
					return next();
				}

				body2 = JSON.parse(body);
				startBusScraper({
					from: from,
					to: h.deFormat(body2.dir[0].n),
					hour: data.hour,
					min: data.min,
					timetype: data.timetype,
					day: data.day
				})
			});


		});
	}else if(data.fromLat && data.fromLng){
		var xy = h.WGS84_To_ISN93(data.fromLat,data.fromLng);
		request.get({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: 'http://ja.is/kort/bestpath/?fX='+xy.x+'&fY='+xy.y+'&tX='+xy.x+'&tY='+xy.y+'&d=10.88'
		}, function(error, response, body){
			if(error){
				res.json(200,{success:false});
				return next();
			}

			body = JSON.parse(body);

			startBusScraper({
				from: h.deFormat(body.dir[0].n) ,
				to: data.to,
				hour: data.hour,
				min: data.min,
				timetype: data.timetype,
				day: data.day
			})
		});
	}else if(data.toLat && data.toLng){
		var xy = h.WGS84_To_ISN93(data.toLat,data.toLng);
		request.get({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: 'http://ja.is/kort/bestpath/?fX='+xy.x+'&fY='+xy.y+'&tX='+xy.x+'&tY='+xy.y+'&d=10.88'
		}, function(error, response, body){
			if(error){
				res.json(200,{success:false});
				return next();
			}

			body = JSON.parse(body);

			startBusScraper({
				from: data.from,
				to: h.deFormat(body.dir[0].n),
				hour: data.hour,
				min: data.min,
				timetype: data.timetype,
				day: data.day
			})
		});
	}else{
		startBusScraper({
			from: data.from,
			to: data.to,
			hour: data.hour,
			min: data.min,
			timetype: data.timetype,
			day: data.day
		})
	}
	*/
	
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