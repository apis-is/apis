/*
About:   An API for all names that are allowed in Iceland. Names are devided into male names, female names and middle names
Author:  Hjörtur Líndal Stefánsson
Email:   hjorturls@gmail.com
Created: August 2014 
*/

var request = require('request'),
	h = require('apis-helpers'),
	app = require('../../server'),
    cheerio = require('cheerio');

/* Root names handler - only returns a list of resources */
app.get('/names', function (req, res) {
  return res.json(
    {
      results: [
        {
          info: 'This is an api that lists all allowed Icelandic names. A search parameter can be used with each endpoint',
          endpoints: {
            males: '/names/males/',
            females: '/names/females/',
            middlenames: '/names/middlenames/' 
          }
        }
      ]
    }
  );
});

/* Get all legal names for males */
app.get('/names/males/:filter?', function(req, res){
	var url = 'https://www.island.is/mannanofn/leit/?Stafrof=&Drengir=on&Samthykkt=yes';
	return handleRequest(url, req, res);
});

/* Get all legal names for females */
app.get('/names/females/:filter?', function(req, res){
	var url = 'https://www.island.is/mannanofn/leit/?Stafrof=&Stulkur=on&Samthykkt=yes';
	return handleRequest(url, req, res);
});

/* Get all legal middle names */
app.get('/names/middlenames/:filter?', function(req, res){
	var url = 'https://www.island.is/mannanofn/leit/?Stafrof=&Millinofn=on&Samthykkt=yes';
	return handleRequest(url, req, res);
});

/* Get all rejected names for males */
app.get('/names/rejected/males/:filter?', function(req, res){
  var url = 'https://www.island.is/mannanofn/leit/?Stafrof=&Drengir=on&Samthykkt=no';
  return handleRequest(url, req, res);
});

/* Get all rejected names for females */
app.get('/names/rejected/females/:filter?', function(req, res){
  var url = 'https://www.island.is/mannanofn/leit/?Stafrof=&Stulkur=on&Samthykkt=no';
  return handleRequest(url, req, res);
});

/* Get all rejected middle names */
app.get('/names/rejected/middlenames/:filter?', function(req, res){
  var url = 'https://www.island.is/mannanofn/leit/?Stafrof=&Millinofn=on&Samthykkt=no';
  return handleRequest(url, req, res);
});

/* Get all rejected names */
app.get('/names/rejected/:filter?', function(req, res){
  var url = 'https://www.island.is/mannanofn/leit/?Stafrof=&Stulkur=on&Drengir=on&Millinofn=on&Samthykkt=no';
  return handleRequest(url, req, res);
});

/* Handles the request for a specific request URL */
function handleRequest(url, req, res) {
	// Check for the filter parameter
	var filter = req.params.filter || req.query.filter || req.query.search || '';

	// Add name filtering if it is requested
	if (filter !== ''){
		url += '&Nafn=' + filter;
	}
	
	request.get({
		headers: {'User-Agent': h.browser()},
		url: url
	}, function(error, response, body){
		if(error || response.statusCode !== 200)
			return res.json(500,{error:'www.island.is refuses to respond or give back data'});

		try{
			var $ = cheerio.load(body);	
		}catch(error){
			return res.json(500,{error:'Could not parse body'});
		}

		var	obj = { results: []};
		
		// Clear data regarding the acceptance date of the name (not needed)
		$('.dir li i').each(function(key) {
			$(this).remove();
		});

		// Loop through all the names in the list and add them to our array
		$('.dir li').each(function(key){
			var name = $(this).text();
			obj.results.push(name.trim());
		});
		
		// Return the results as JSON and cache for 24 hours
		return res.cache(86400).json(obj);
	});
}
