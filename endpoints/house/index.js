//Ókl!
exports.slash = function(req, res, next){
	var data = req.params;
	res.charSet = 'utf8';

	var houseUrl = 'https://www.skra.is/default.aspx?pageid=1000&selector=streetname&streetname='+encodeURIComponent(data.search)+'&submitbutton=Leita';

	console.log(houseUrl)
	scraper(
	{
		'uri': houseUrl,
		'headers': {
			'User-Agent': h.browser()
		}
	}, function(err, $) {
		if (err) {
			//h.logError(err,err.stack)

			return next();
		}

		//console.log($('.resulttable').html())

		$('.resulttable').find('tbody').find('tr').each(function(){
			//console.log($(this).html())

			$(this).find('tr').each(function(){
				console.log($(this).html())
			})
		})
		var obj = { results: []},
			outerCount = 1;

		// if($('.resultnote').length == 0){
		// 	$('body').find('.boxbody > .nozebra').find('tbody').find('tr').each(function() {

		// 		if(outerCount == 1){
		// 			var name = $('body').find('.boxbody > h1').html(),
		// 			sn = $('body').find('.boxbody > h1').html();

		// 			var company = {
		// 				name: name.substring(0,name.indexOf('(')-1),
		// 					sn: sn.substring(sn.length-11,sn.length-1),
		// 					active: 1,
		// 					address: ''
		// 				};

		// 				var count = 1;

		// 				$(this).find('td').each(function() {
		// 					if(count == 1){
		// 						company.address = $(this).html().replace(/<(?:.|\n)*?>/gm, '');
		// 					}

		// 					count++;
		// 				});

		// 				obj.results.push(company);
		// 			}
		// 			outerCount++
		// 		});
		// }else{
		// 	$('table').find('tr').each(function() {

		// 		var count = 1,
		// 			company = {
		// 				name: '',
		// 				sn: '',
		// 				active: 1,
		// 				address: 0
		// 			};
		// 		if(outerCount != 1){

		// 			$(this).find('td').each(function() {

		// 				if(count == 1){
		// 					company.sn = $(this).html().replace(/<(?:.|\n)*?>/gm, '');
		// 				}else if(count == 2){
		// 					var val = $(this).html().replace(/<(?:.|\n)*?>/gm, '');

		// 					if(val.indexOf('(Félag afskráð)') > 0){
		// 						company.active = 0;
		// 					}

		// 					company.name = val.replace("\n","").replace("(Félag afskráð)","").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		// 				}else if(count == 3){
		// 					company.address = $(this).html().replace(/<(?:.|\n)*?>/gm, '')
		// 				}

		// 				count++;

		// 			});

		// 			obj.results.push(company);
		// 		}
		// 		outerCount++;

		// 	});	
		// }
		res.json(200,obj);
		//h.logVisit('/company', obj);
	}
	);
}