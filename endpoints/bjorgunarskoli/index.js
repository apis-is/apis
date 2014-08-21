var request = require('request'),
    $ = require('jquery'),
    app = require('../../server');


app.get('/bjorgunarskoli', function(req, res) {
    getRequest(function(body) {
        return res.cache(3600).json({
            results: parseList(body)
        });
    });
});


var getRequest = function(callback, url) {
    url = 'http://skoli.landsbjorg.is/Open/Seminars.aspx?';

    var params = {
        url: url
    };

    request(params, function (error, res, body) {
        if (error) throw new Error(error);

        if (res.statusCode != 200) {
            throw new Error("HTTP error from endpoint, status code " + res.statusCode);
        }

        return callback(body);
    });
};

var parseList = function ( body ) {
	var site;

	try {
		site = $(body);
	} catch(error) {
		throw new Error("Could not parse body");
	}

    var results = [];

    var tr = site.find('table.rgMasterTable tbody').eq(1).find('tr');

    tr.each(function (i) {
        if ( i === 0 ) return;
        var td = $(this).find('td');

        results.push({
             availability:  (td.eq(0).find('img').length > 0 ? 'Limited':'Open'),
             id: td.eq(3).text().trim(),
             name: td.eq(4).text().trim(),
             sveit: (td.eq(5).find('input').prop('checked')?'Squad':'SAR'),
             start: td.eq(6).text().trim(),
             end: td.eq(7).text().trim(),
             location: td.eq(8).text().trim(),
             price_regular: td.eq(9).text().trim(),
             price_members: td.eq(10).text().trim(),
             status:  (td.eq(11).text().trim() == 'Ekki hafið' ? 'Not started':'Started'),
             link:  'http://skoli.landsbjorg.is/Open/Course.aspx?Id=' + td.eq(3).text().trim()
        });
    });

    return results;
};
