var request = require('request');
var cheerio = require('cheerio');
var h = require('../../lib/helpers.js');

exports.setup = function (server) {
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
		if (error) return callback(err);

		var $, obj = {
			results: []
		};

		try {
			$ = cheerio.load( body );
		} catch (e) {
			exports.logError( e );
		}

		var movies = $('.Kvikmyndir_TimeTable #divbox').find('.utanumMynd_new');

		movies.each(function() {
			var movie = $(this);
			var st = [];
			var showtimes = movie.find('[id^="myndbio"]');

			showtimes.each(function() {
				var showtime = {
					theater: $(this).find('#bio a').text().trim(),
					schedule: []
				};

				$(this).find('.syningartimi_item').each(function() {
					showtime.schedule.push( $(this).text().trim() );
				});

				st.push( showtime );
			});

			obj.results.push({
				title: movie.find('#mynd_titill a').html().trim(),
				released: movie.find('.mynd_titill_artal').text().match(/\d+/g)[0].trim(),
				restricted: movie.find('.mynd_aldurstakmark img').attr('alt').trim(),
				imdb: movie.find('.imdbEinkunn').text().trim(),
				image: 'http://kvikmyndir.is' + movie.find('img.poster').attr('src').trim(),
				showtimes: st
			});
		});

		res.json(200, obj);
		return next();
	});
};