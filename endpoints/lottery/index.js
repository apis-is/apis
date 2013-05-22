var request = require('request');
var $ = require('jquery');
var h = require('../../lib/helpers.js');

exports.setup = function(server) {
    server.get({path: '/lottery', version: '1.0.0'}, getLotto);
	server.get({path: '/lottery/lotto', version: '1.0.0'}, getLotto);
	server.get({path: '/lottery/vikingslotto', version: '1.0.0'}, getViking);
	server.get({path: '/lottery/eurojackpot', version: '1.0.0'}, getEurojackpot);
};

var getLotto = function (req, res, next) {
    getLottery(function(body) {
        res.json(200, {
            results: parseList(body)
        });
        return next();
    });
};

var getViking = function (req, res, next) {
    getLottery(function(body) {
        res.json(200, {
            results: parseList(body)
        });
        return next();
    }, 'https://games.lotto.is/lottoleikir/urslit/vikingalotto/');
};

var getEurojackpot = function (req, res, next) {
    getLottery(function(body) {
        res.json(200, {
            results: parseList(body)
        });
        return next();
    }, 'https://games.lotto.is/lottoleikir/urslit/eurojackpot/');
};

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
	var site;

	try {
		site = $(body);
	} catch(error) {
		throw new Error("Could not parse body");
	}

    var results = [];

    var tr = site.find('table').eq(1).find('tr');

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