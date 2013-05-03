var request = require('request');
var moment = require('moment');
var $ = require('jquery');
var h = require('../../lib/helpers.js');

exports.setup = function(server){
	server.post({path: '/currency', version: '1.0.0'}, slash);
	server.get({path: '/currency', version: '1.0.0'}, slash);
}

var slash = function(req, res, next){
    var provider = req.params.provider || 'm5'; //m5 determined by a fair dice roll
    var providers = ['m5', 'arion', 'lb'];
    if (providers.indexOf(provider) >= 0) {
        require('./'+provider+'.js').getCurrencies(req, res, next);
    } else {
		res.json(404,{error:'This provider does not exist',code:2});
		return next();
    }
}
