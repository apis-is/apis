
// dependencies
var app = require('../../server'),
	request = require('request'),
	helper = require('apis-helpers'),
	cheerio = require('cheerio'),
	_ = require('underscore');

var baseUrl = 'http://bin.arnastofnun.is/',
 query = 'leit/?q=';


app.get('/declension/:word', function(req, res) {
	var word = req.params.word;

	// request params
	var params = {
		url: baseUrl.concat(query, word),
		headers: { 'User-Agent': helper.browser() }
	};
	
	
	return res.json(502,{
		results: [], type: '',
		error: "This API endpoint has been temporarily disabled, due to changes in markup at the remote location. Feel free to contribute!",
		moreinfo: "https://github.com/kristjanmik/apis/issues/96"
	});

	getDeclensions(function(body) {
		return res.json(parseTable(body));
  }, params);
});

// return permutation of a given word
function getDeclensions(callback, params) {
	request.get(params, function(err, res, body) {

		if (err || res.statusCode != 200) {
			throw new Error(err);
		}

		var $;

		try {
			$ = cheerio.load(body);
		} catch(error) {
			throw new Error(error);
		}

		var result = $("#main ul li a");

		// more than 1 result from request (ex: 'hús')
		if (result.length > 1) {

		// call recursively again with new url
		params.url = baseUrl.concat(result[0].attribs.href);
			getDeclensions(callback, params);
			return;
		};

		// else just call func to return data
		return callback($("#main"));

	});
};


// Creates a sequence of integers, each iteration creates a value and increments that value by 1
// step: specify how often to run the iteration
// increment: how much to increment after each iteration
function generateSequence(start, step, increment) {
	// ex:
	// input: start: 0, step: 4, increment: 3
	// output: [ 0, 1, 4, 5, 8, 9, 12, 13 ]
	var results = [];

	_.each(_.range(start, step), function(i) {
		var value = (i + increment * i);
	
		results.push(value, value + 1);
	});

	return results;
};


function parseTable(data) {
	var type = data.find('center:first-child').contents().eq(2).text().trim();

	// create a sequence which is the same as the index of 'Eintala' of the td's in the HTML table.
	var singular = generateSequence(0, 4, 3),
		results = [];

	data.find('table tr td span').each(function(i) {
		var parent = this.parent();
		
		results.push({
			predicate: parent.parent().find('td:first-child').text(),
			value: this.text(),
			category: i in singular ? 'Eintala' : 'Fleirtala'
		});
	});
	
	return { results: results, type: type };
};
