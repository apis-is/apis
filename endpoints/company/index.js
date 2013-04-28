var request = require('request');
var $ = require('jquery');
var h = require('../../lib/helpers.js');

exports.setup = function(server){
	server.post({path: '/company', version: '1.0.0'}, lookup); //Old

	server.get({path: '/company', version: '1.0.0'}, lookup);
}
var lookup = function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.charSet = 'utf8';
	
	var data = req.params;

	if(!data.name) data.name = '';
	if(!data.address) data.address = '';
	if(!data.socialnumber) data.socialnumber = '';
	if(!data.vsknr) data.vsknr = '';

	var companyUrl = 'http://www.rsk.is/fyrirtaekjaskra/leit?nafn='+data.name+'&heimili='+data.address+'&kt='+data.socialnumber+'&vsknr='+data.vsknr; 

	request.get({
		headers: {'User-Agent': h.browser()},
		url: companyUrl
	}, function(error, response, body){
		if (error) {
			h.logError(error,error.stack)
			res.json(500,{'error':'Something went wrong'})
			return next();
		}

		var obj = { results: []},
			outerCount = 1,
			data = $(body);

		if(data.find('.resultnote').length == 0){
			data.find('.boxbody > .nozebra').find('tbody').find('tr').each(function() {

			if(outerCount == 1){
				var name = data.find('.boxbody > h1').html(),
				sn = data.find('.boxbody > h1').html();

				var company = {
					name: name.substring(0,name.indexOf('(')-1),
						sn: sn.substring(sn.length-11,sn.length-1),
						active: 1,
						address: ''
					};

					var count = 1;

					$(this).find('td').each(function() {
						if(count == 1){
							company.address = $(this).html().replace(/<(?:.|\n)*?>/gm, '');
						}

						count++;
					});

					obj.results.push(company);
				}
				outerCount++
			});
		}else{
			data.find('table').find('tr').each(function() {

				var count = 1,
					company = {
						name: '',
						sn: '',
						active: 1,
						address: 0
					};
				if(outerCount != 1){

					$(this).find('td').each(function() {

						if(count == 1){
							company.sn = $(this).html().replace(/<(?:.|\n)*?>/gm, '');
						}else if(count == 2){
							var val = $(this).html().replace(/<(?:.|\n)*?>/gm, '');

							if(val.indexOf('(Félag afskráð)') > 0){
								company.active = 0;
							}

							company.name = val.replace("\n","").replace("(Félag afskráð)","").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
						}else if(count == 3){
							company.address = $(this).html().replace(/<(?:.|\n)*?>/gm, '')
						}

						count++;

					});

					obj.results.push(company);
				}
				outerCount++;

			});	
		}
		
		h.logVisit('/company', obj,false);
		
		res.json(200,obj)
		return next();

	});
}