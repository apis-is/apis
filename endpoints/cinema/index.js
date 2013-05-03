var request = require('request');
var cheerio = require('cheerio');
var h = require('../../lib/helpers.js');

exports.setup = function ( server ) {
	server.get({path: '/cinema', version: '1.0.0'}, getMovies);
};

/**
 * Fetches movies for show today in Icelandic cinemas.
 * response - JSON: Movie data within an 'results' array.
 */
var getMovies = function (req, res, next) {
	res.charSet = 'utf8';

	var url = 'http://kvikmyndir.is/bio/syningatimar/';

	request(url, function (error, response, body) {
		if (error) throw new Error( url + ' not responding correctly...' );

		// Cheerio declared and then attemted to load.
		var $;

		try {
			$ = cheerio.load( body );
		} catch (e) {
			throw new Error( 'Could not load the body with cherrio.' );
		}

		// Base object to be added to
		// and eventually sent as a JSON response.
		var obj = {
			results: []
		};

		// DOM elements array containing all movies.
		var movies = $('.Kvikmyndir_TimeTable #divbox').find('.utanumMynd_new');

		// Loop through movies
		movies.each(function() {
			// This movie.
			var movie = $(this);

			// Showtimes for JSON
			var showtimes = [];

			// Find all theaters and loop through them.
			var theaters = movie.find('[id^="myndbio"]');
			theaters.each(function() {
				// Single theater
				var theater = {
					theater: $(this).find('#bio a').text().trim(),
					schedule: []
				};

				// Loop through each showtime and
				// add them to the theater schedule.
				$(this).find('.syningartimi_item').each(function() {
					theater.schedule.push( $(this).text().trim() );
				});

				// Add theater to showtimes array.
				showtimes.push( theater );
			});

			// Clean up image URL
			var imgURL = movie.find('img.poster').attr('src').match(/\/images\/poster\/.+\.jpg/g)[0];

			// Create an object of info
			// and add it to the 'results' array.
			obj.results.push({
				title: movie.find('#mynd_titill a').html().trim(),
				released: movie.find('.mynd_titill_artal').text().match(/\d+/g)[0].trim(),
				restricted: movie.find('.mynd_aldurstakmark img').attr('alt').trim(),
				imdb: movie.find('.imdbEinkunn').text().trim(),
				image: 'http://kvikmyndir.is' + imgURL,
				showtimes: showtimes
			});
		});

		res.json(200, obj);
		return next();
	});
};