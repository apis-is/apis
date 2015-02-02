var request = require('request'),
    app = require('../../server'),
    cheerio = require('cheerio');


var getLotto = function (req, res) {
    getLottery(function(body) {
        return res.cache(3600).json({
            results: parseList(body)
        });
    });
};

app.get('/lottery', getLotto);
app.get('/lottery/lotto', getLotto);

app.get('/lottery/vikingalotto', function(req, res) {
    getLottery(function(body) {
        return res.cache(3600).json({
            results: parseList(body)
        });
    }, 'https://games.lotto.is/lottoleikir/urslit/vikingalotto/');
});
app.get('/lottery/eurojackpot', function(req, res) {
    getLottery(function(body) {
        return res.cache(3600).json({
            results: parseList(body)
        });
    }, 'https://games.lotto.is/lottoleikir/urslit/eurojackpot/');
});

var getLottery = function(callback, url) {
    url = url || 'https://igvefur.lotto.is/lottoleikir/urslit/lotto/';

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

    var tr = $('table').eq(1).find('tr');

    tr.each(function (i) {
        if ( i === 0 ) return;
        var td = $(this).find('td');

        results.push({
             date:  td.eq(0).text().trim(),
             lotto: td.eq(1).html().match(/\d{1,2}/g).join(' ').replace(/(\d{1,2})$/, '($1)'),
             joker: td.eq(2).text().trim(),
             prize: td.eq(3).text().trim(),
             link:  'http://lotto.is' + td.eq(4).find('a').attr('href').trim()
        });
    });

    return results;
};
