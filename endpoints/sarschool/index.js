var request = require('request');
var app = require('../../server');
var cheerio = require('cheerio');

String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  for (var i = 0; i < find.length; i++) {
    replaceString = replaceString.replace(find[i], replace[i]);
  }
  return replaceString;
};
function pad(n){return n<10 ? '0'+n : n}


app.get('/sarschool', function(req, res) {


    getRequest(function(body) {
        return res.cache().json({
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

	try {
		var $ = cheerio.load(body);
	} catch(error) {
		throw new Error("Could not parse body");
	}

    var results = [];


    var tr = $('.rgMasterTable').find('tbody').find('tr');

    tr.each(function (i) {
        var td = $(this).find('td');

        // Change start time from d.m.YYYY to YYYY-mm-dd
        var start_date = td.eq(6).text().trim();
        if(start_date=="") {
        	var start_date_final = "n/a";
        } else {
      		var sd_split = start_date.split(".");
	  		var sd = new Date(sd_split[2],sd_split[1],sd_split[0]);
	  		var start_date_final = sd.getFullYear()+"-"+pad(sd.getMonth())+"-"+pad(sd.getDate());
		}

        // Change end time from d.m.YYYY to YYYY-mm-dd
        var end_date = td.eq(7).text().trim();
        if(end_date=="") {
        	var end_date_final = "n/a";
        } else {
      		var ed_split = end_date.split(".");
	  		var ed = new Date(ed_split[2],ed_split[1],ed_split[0]);
	  		var end_date_final = ed.getFullYear()+"-"+pad(ed.getMonth())+"-"+pad(ed.getDate());
		}

		var find = [".", " kr."];
		var replace = ["", ""];

        results.push({
             id: (td.eq(3).text().trim()==""?"":parseFloat(td.eq(3).text().trim())),
             name: (td.eq(4).text().trim()==""?"":td.eq(4).text().trim()),
             time_start: start_date_final,
             time_end: end_date_final,
             sar_members_only: (td.eq(0).find('img').length > 0 ? 1:0),
             host: (td.eq(5).find('input').attr('checked') == 'checked' ? 'Squad' : 'Other'),
             location: (td.eq(8).text().trim()==""?"":td.eq(8).text().trim()),
             price_regular: (td.eq(9).text().trim()==""?"":parseFloat(td.eq(9).text().trim().replace(".",""))),
             price_members: (td.eq(10).text().trim()==""?"":parseFloat(td.eq(10).text().trim().replace(".",""))),
             link:  'http://skoli.landsbjorg.is/Open/Course.aspx?Id=' + td.eq(3).text().trim()
        });
    });

    return results;
};
