//Very incomplete
exports.setup = function(){
	server.post({path: '/word', version: '1.0.0'}, slash);
}

slash = function(req, res, next){

	var data = req.params;

	if(!data.number)
		data.number = '';

	var url = 'http://bin.arnastofnun.is/leit.php?id=408186';
	console.log(url);
	request.get({
		headers: {'User-Agent': h.browser()},
		url: url
	}, function(error, response, body){
		if(error){
			res.json(200,{success:false});
			return next();
		}
		var data = $(body),
			obj = { results: []};

		var word = {};


		//Try to find the wordtype
		var type = '',
			center = data.find('center').html(),
			brIndex = center.indexOf('<br />'),
			preType = center.substr(brIndex+7, brIndex.length);
		//Kvenkynsnafnorð - Karlkynsnafnorð - Hvorugkynsnafnorð - Lýsingarorð
		if(preType == 'Kvenkynsnafnorð' || preType == 'Karlkynsnafnorð' || preType == 'Hvorugkynsnafnorð'){
			type = 'no'
		}
		//Todo bæta við sagnorðum

		data.find('table tr').each(function(key){

			if(key == 0){ //Það sem skilgreinir hvað dálkurinn er

			}
			//console.log($(this).html())
		});

		obj.results.push(word);

		h.logVisit('/word', obj);
		res.json(200,obj)
		//res.json(200,{'bla':true});
		return next();

	});
}