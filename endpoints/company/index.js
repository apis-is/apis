var request = require('request'),
    cheerio = require('cheerio'),
    h = require('apis-helpers'),
    app = require('../../server');

app.get('/company', function(req, res, next){
    
    var queryString = {
        nafn: req.query.name || '',
        heimili: req.query.address || '',
        kt: req.query.socialnumber || '',
        vsknr: req.query.vsknr || ''
    };

    request.get({
        headers: {'User-Agent': h.browser()},
        url: 'http://www.rsk.is/fyrirtaekjaskra/leit',
        qs: queryString
    }, function(error, response, body){
        if(error || response.statusCode !== 200) {
            return res.json(500,{error:'www.rsk.is refuses to respond or give back data'});
        }

        var obj = { results: [] },
              $ = cheerio.load(body);

        if($('.resultnote').length === 0){
            var tr = $('.boxbody > .nozebra tbody tr').first();
            if (tr.length > 0) {
                var name = $('.boxbody > h1').html(),
                    sn = $('.boxbody > h1').html();

                obj.results.push({
                    name: name.substring(0,name.indexOf('(')-1),
                    sn: sn.substring(sn.length-11,sn.length-1),
                    active: $('p.highlight').text().length === 0 ? 1 : 0,
                    address: tr.find('td').eq(0).text()
                });
            }
        } else {
            $('table tr').slice(1).each(function() {

                var td = $(this).find('td');
                var nameRoot = td.eq(1).text();
                var felagAfskrad = "(Félag afskráð)";

                obj.results.push({
                    name: nameRoot.replace("\n","").replace(felagAfskrad,"").replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
                    sn: td.eq(0).text(),
                    active: nameRoot.indexOf(felagAfskrad) > -1 ? 0 : 1,
                    address: td.eq(2).text()
                });

            }); 
        }
        
        return res.cache(86400).json(obj);
    });
});
