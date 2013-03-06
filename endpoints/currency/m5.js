exports.slash = function(req, res, next){
	res.charSet = 'utf8';

	var currencyNames = {
		s: ['USD','DKK','EUR','JPY','CAD','NOK','GBP','CHF','SEK','TWI','XDR','ISK'],
		l: ['Bandarískur dalur','Dönsk króna','Evra','Japanskt jen','Kanadískur dalur','Norsk króna','Sterlingspund','Svissneskur franki','Sænsk króna','Gengisvísitala','SDR','Íslensk króna']
	}

	request.get({
		headers: {'User-Agent': h.browser()},
		url: 'http://www.m5.is/?gluggi=forsida'
	}, function(error, response, body){
		if(error){
			res.json(500,{error:"Something went wrong"});
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
						currency.longName = h.currency[currency.shortName].long
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

		if(req.header('Uptime-Test') == 'true'){
			h.logVisit('/currency', obj,true);
		}else{
			h.logVisit('/currency', obj,false);
		}
		res.json(200,obj);
		return next();
	});	
}