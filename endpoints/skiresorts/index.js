var request = require('request'),
	$ = require('jquery'),
	h = require('../../lib/helpers.js'),
	app = require('../../server'),
	resort = '';

app.get('/skiresorts', function(req, res){
	var data = req.query,
		url = '',
		availableAreas = ['reykjavik', 'akureyri', 'hlidarfjall', 'fjardarbyggd', 'siglufjordur'];

	if(!data.area || $.inArray(data.area, availableAreas) == -1) data.area = 'reykjavik';

	setArea = data.area;

	if(data.area == 'reykjavik'){
		url = 'http://www.skidasvaedi.is/desktopdefault.aspx/tabid-22/';
	}else if(data.area == 'akureyri'){
		url = 'http://www.hlidarfjall.is/is/fjallid';
	}else if(data.area == 'fjardarbyggd'){
		url = 'http://www.oddsskard.is/is/skidasvaedi';
	} else if(data.area == 'siglufjordur') {
		url = 'http://www.skardsdalur.is/';
	}else{
		url = 'http://www.skidasvaedi.is/desktopdefault.aspx/tabid-22/';
	}

	request.get({
		headers: {'User-Agent': h.browser()},
		url: url
	}, function(error, response, body){
		if(error || response.statusCode !== 200)
			return res.json(500,{error:'Unable to gather info from ski resort website'});

		try{
			var data = $(body);	
		}catch(error){
			return res.json(500,{error:'Could not parse body'});
		}


		var areas = {
			'reykjavik': [
				{
					'name':'Höfuðborgarsvæðið',				
					'resorts': [
						{
							'name': 'Bláfjöll',
							'data_element': '#tab-1 .opening-info dt',
							'webcam_url': 'http://cctv.skidasvaedi.is/current.jpg',
							hill_name: function(element) {
								return $(element).text();
							},
							hill_open: function(element) {
								return $(element).next('dd').hasClass('open');
							}
						},
						{
							'name': 'Skálafell',
							'data_element': '#tab-2 .opening-info dt',
							'webcam_url': 'http://opnumskalafell.is/webcam/webcam/current.jpg',
							hill_name: function(element) {
								return $(element).text();
							},
							hill_open: function(element) {
								return $(element).next('dd').hasClass('open');
							}
						}
					]
				}
			],
			'akureyri': [
				{
					'name':'Akureyri',
					'resorts': [
						{
							'name': 'Hlíðarfjall',
							'data_element': '#fjallid li',
							'webcam_url': 'http://www.hlidarfjall.is/static/files/vedurmyndir/hlidarfjall/current.jpg',
							hill_name: function(element) {
								return $(element).text();
							},
							hill_open: function(element) {
								return $(element).find('img').attr('alt') == 'Opin';
							}
						}
					]
				}
			],
			'siglufjordur': [
				{
					'name':'Siglufjörður',
					'resorts': [
						{
							'name': 'Skarðsdalur',
							'data_element': '#center .entryContent p:eq(1) img',
							'webcam_url': 'http://157.157.79.85:8080/view/index.shtml',
							hill_name: function(element) {
								var index = $(element).index(),
									html = $(element).parent().html().replace(/&nbsp;/g, ''),
									arr = html.split(/<img.*?\/>/g);

								return arr[index+1];
							},
							hill_open: function(element) {
								return $(element).attr('src').indexOf('green') > -1;
							}
						}
					]
				}
			],
			'fjardarbyggd': [
				{
					'name':'Fjarðarbyggð',
					'resorts': [
						{
							'name': 'Oddsskarð',
							'data_element': '#promo tr',
							'webcam_url': 'http://www.oddsskard.is/static/oddsskard/images/forsidumynd.jpg',
							hill_name: function(element) {
								return $(element).find('td:eq(0)').text();
							},
							hill_open: function(element) {
								return $(element).find('td:eq(1)').text().indexOf('lok') == -1;
							}
						}
					]
				}
			]
		}

		var obj = {results: []};

		$.each(areas[setArea], function(k,v) {
			var area = { 'name': v.name, 'resorts' : [] };
			$.each(v.resorts, function(kk, res) {
				var resort = { 'name': res.name, 'webcam': res.webcam_url, 'hills': [] };
				data.find(res.data_element).each(function() {
					var hill = { 'name': $.trim(res.hill_name($(this))), 'open': res.hill_open($(this)) };
					resort.hills.push(hill);
				});
				resort.hills.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
				// Fix because of dumb setup on Skálafell website.
				if(resort.name == 'Skálafell') resort.hills.pop();
				
				area.resorts.push(resort);
			});
			obj.results.push(area);
		})

		return res.cache(3600).json(obj);
	});
});
