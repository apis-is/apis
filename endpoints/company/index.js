var request = require('request');
var $ = require('jquery');
var h = require('../../lib/helpers.js');

$.fn.cleanHtml = function() {
    return $.trim(this.html().replace(/<(?:.|\n)*?>/gm, ''));
};

exports.setup = function(server){
	server.post({path: '/company', version: '1.0.0'}, lookup); //Old
	server.get({path: '/company', version: '1.0.0'}, lookup);
}
var lookup = function(req, res, next){
	
    var queryString = {
        nafn: req.params.name || '',
        heimili: req.params.address || '',
        kt: req.params.socialnumber || '',
        vsknr: req.params.vsknr || ''
    };

	request.get({
        headers: {'User-Agent': h.browser()},
        url: 'http://www.rsk.is/fyrirtaekjaskra/leit',
        qs: queryString
	}, function(error, response, body){
		if(error || response.statusCode !== 200) {
            throw new Error("www.rsk.is refuses to respond or give back data");
        }

		var obj = { results: [] },
			data = $(body);

		if(data.find('.resultnote').length == 0){
            var tr = data.find('.boxbody > .nozebra tbody tr:first');
            if (tr.length > 0) {
                var name = data.find('.boxbody > h1').html(),
                    sn = data.find('.boxbody > h1').html();

                obj.results.push({
                    name: name.substring(0,name.indexOf('(')-1),
                    sn: sn.substring(sn.length-11,sn.length-1),
                    active: data.find('p.highlight').text().length === 0 ? 1 : 0,
                    address: tr.find('td').eq(0).cleanHtml()
                });
            }
		}else{
			data.find('table tr:not(:first)').each(function() {

                var td = $(this).find('td');
                var nameRoot = td.eq(1).cleanHtml();
                var felagAfskrad = "(Félag afskráð)";

                obj.results.push({
                    name: nameRoot.replace("\n","").replace(felagAfskrad,"").replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
                    sn: td.eq(0).cleanHtml(),
                    active: nameRoot.indexOf(felagAfskrad) > -1 ? 0 : 1,
                    address: td.eq(2).cleanHtml()
                });

			});	
		}
		
		res.json(200,obj)
		return next();
	});
};
