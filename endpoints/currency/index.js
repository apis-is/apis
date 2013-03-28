exports.setup = function(){
	server.post({path: '/currency', version: '1.0.0'}, slash);
}

slash = function(req, res, next){
	var data = req.params;
	res.charSet = 'utf8';

	var currencyNames = {
		s: ['USD','DKK','EUR','JPY','CAD','NOK','GBP','CHF','SEK','TWI','XDR','ISK'],
		l: ['Bandarískur dalur','Dönsk króna','Evra','Japanskt jen','Kanadískur dalur','Norsk króna','Sterlingspund','Svissneskur franki','Sænsk króna','Gengisvísitala','SDR','Íslensk króna']
	}

	if(data.provider == 'm5'){

		request.get({
			headers: {'User-Agent': h.browser()},
			url: 'http://www.m5.is/?gluggi=forsida'
		}, function(error, response, body){
			if(error){
				res.json(500,{error:"Something went wrong on the server"});
				return next();
			}

			var data = $(body),
				obj = { results: []};

			data.find('.table-striped tr').each(function(){
				
				var count = 1,
					push = false,
					currency = {
						shortName: '',
						longName: '',
						value: 0,
						askValue: 0,
						bidValue: 0,
						changeCur: 0,
						changePer: 0,
					};

				$(this).find('td').each(function() {
					if($(this).html().replace(/<(?:.|\n)*?>/gm, '') != ''){
						push = true
					}
					switch(count){
						case 1:
							currency.shortName = $(this).html().replace(/<(?:.|\n)*?>/gm, '');
							break;
						case 2:
							if(currency.shortName == currencyNames.s[0]) //USD
								currency.longName = currencyNames.l[0];
							else if(currency.shortName == currencyNames.s[1]) //DKK
								currency.longName = currencyNames.l[1];
							else if(currency.shortName == currencyNames.s[4]) //CAD
								currency.longName = currencyNames.l[4];
							else if(currency.shortName == currencyNames.s[5]) //NOK
								currency.longName = currencyNames.l[5];
							else if(currency.shortName == currencyNames.s[8]) //SEK
								currency.longName = currencyNames.l[8];
							else if(currency.shortName == currencyNames.s[9]) //TWI
								currency.longName = currencyNames.l[9];
							else
								currency.longName = $(this).html().replace(/<(?:.|\n)*?>/gm, '');
							break;
						case 3:
							currency.value = $(this).html().replace(/<(?:.|\n)*?>/gm, '').replace(',','.');
							break;
						case 4:
							break;
						case 5:
							currency.changeCur = $(this).html().replace(/<(?:.|\n)*?>/gm, '').replace(',','.');
							break;
						case 6:
							var val = $(this).html().replace(/<(?:.|\n)*?>/gm, '');
							currency.changePer = val.substring(1,val.length-2).replace(',','.');
							break;
						case 7:
							break;
					}
					count++;
				});

				if(push)
					obj.results.push(currency);

			});

			h.logVisit('/currency', obj,false);
			
			res.json(200,obj);
			return next();

		});
	}else if(data.provider == 'arion'){		

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
				obj = { results: []};

			jsonObject.forEach(function(object,i){
				var changePer = parseFloat(object.LastValueChange)/parseFloat(object.MidValue),
					currency = {
						shortName: object.Ticker,
						longName: currencyNames.l[currencyNames.s.indexOf(object.Ticker)],
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
	}else{
		res.json(404,{error:'This provider does not exist',code:2});
		return next();
	}
}