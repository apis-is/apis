var request = require('request'),
	$ = require('jquery'),
	h = require('apis-helpers'),
	app = require('../../server');

app.get('/carparks', function(req, res){
	
	var url = 'http://www.bilastaedasjodur.is/';

	request.get({
		headers: {'User-Agent': h.browser()},
		url: url
	}, function(error, response, body){
		if(error || response.statusCode !== 200)
			return res.json(500,{error:'www.bilastaedasjodur.is refuses to respond or give back data'});

		try{
			var data = $(body);	
		}catch(error){
			return res.json(500,{error:'Could not parse body'});
		}

		var	obj = { results: []};
		var hus = $('.hus', $(body));

		var js = body.match(/LatLng\((.*?)\)/g);
		
		function parseCoordinates(str) {
			try {
				var Regexp = /(?:^|\s)LatLng.(.*?)\)(?:\s|$)/g;
				var match = Regexp.exec(str);
				return match[1].split(', ');
			}catch(error) {
				return null;
			}
		}

		for(var i=0; i<hus.length; i++) {
			var that = hus[i];
			var freeSpaces = parseInt($(that).find('.ib.free h1').text());
			var totalSpaces = parseInt($(that).find('.ib.total h1').text());

			obj.results.push({
				name: $(that).find('aside h2').text(),
				address: $(that).find('h5').text(),
				parkingSpaces: {
					free: !isNaN(freeSpaces) ? freeSpaces : null, 
					total: !isNaN(totalSpaces) ? totalSpaces : null
				},
				coordinates: parseCoordinates(js[i])
			});
		}
		
		return res.cache(180).json(obj);
	});
});