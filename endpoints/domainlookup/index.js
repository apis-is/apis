var request = require('request');
var $ = require('jquery');
var h = require('../../lib/helpers.js');

//Possible endpoint:
//https://www.isnic.is/is/whois/mini.php?type=all&query=apis.is
exports.setup = function(server){
	server.get({path: '/whois', version: '1.0.0'}, slash);
}

var slash = function(req, res, next){

	var data = req.params;

	if(!data.url) data.url = '';

	var url = 'http://www.isnic.is/is/whois/mini.php?type=all&query='+data.url;

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


		console.log(data.find("h3").html())
		console.log($("h3").html())
		if(data.find("h3").length > 0){
			var obj = {
				found: false
			};
			res.json(200,obj)
		}else{
			res.json({"fannst":true})
		}

		h.logVisit('/whois', obj,false);
		
		res.end();
		//res.json(200,obj)
		return next();
	});
}