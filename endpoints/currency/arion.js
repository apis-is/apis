var request = require('request');
var moment = require('moment');
var h = require('../../lib/helpers.js');

exports.setup = function(server){
	server.get({path: '/currency/arion', version: '1.0.0'}, getCurrencies);
}

var getCurrencies = function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.charSet = 'utf8';

	var toSend = 'm=GetCurrencies&beginDate='+moment().subtract('days', 1).format('YYYY-MM-DD')+'&finalDate='+moment().format('YYYY-MM-DD')+'&currencyType=AlmenntGengi&currenciesAvailable=ISK%2CUSD%2CGBP%2CEUR%2CCAD%2CDKK%2CNOK%2CSEK%2CCHF%2CJPY%2CXDR';

	request.get({
		headers: {'content-type' : 'application/x-www-form-urlencoded'},
		url: 'http://www.arionbanki.is/Webservice/PortalCurrency.ashx',
		body: toSend
	}, function(error, response, body){
		if(error){
			res.json(500,{error:"Something went wrong on the server"});
			return next();
		}

		var jsonObject = JSON.parse(body),
			obj = { results: [] };

		jsonObject.forEach(function(object,i){
			var changePer = parseFloat(object.LastValueChange)/parseFloat(object.MidValue),
				currency = {
					shortName: object.Ticker,
					longName: h.currency[object.Ticker].long,
					value: object.MidValue,
					askValue: object.AskValue,
					bidValue: object.BidValue,
					changeCur: object.LastValueChange,
					changePer: changePer.toFixed(2),
				};

			if(currency.changePer == '-0.00')
				currency.changePer = 0;

			obj.results.push(currency)
		});

		h.logVisit('/currency', obj,false);
		
		res.json(200,obj);
		return next();
	});
};

exports.getCurrencies = getCurrencies;
