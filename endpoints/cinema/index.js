var request = require('request');
var cheerio = require('cheerio');
var h = require('../../lib/helpers.js');

exports.setup = function (server) {
	server.get({path: '/cinema', version: '1.0.0'}, getMovies);
};

var getMovies = function (req, res, next) {
	res.charSet = 'utf8';

	var url = 'http://kvikmyndir.is/bio/syningatimar/';

	request(url, function (error, response, body) {
		if (error) return callback(err);
		var obj = {
			results: []
		};
		try {
			var $ = cheerio.load( body );
			var movies = $('.Kvikmyndir_TimeTable #divbox').find('.utanumMynd_new');

			movies.each(function() {
				var movie = $(this);
				var st = [];
				var showtimes = movie.find('[id^="myndbio"]');

				showtimes.each(function() {
					var showtime = {
						theater: $(this).find('#bio a').text(),
						schedule: []
					};

					$(this).find('.syningartimi_item').each(function() {
						showtime.schedule.push( $(this).text() );
					});

					st.push( showtime );
				});

				obj.results.push({
					title: movie.find('#mynd_titill a').html(),
					released: movie.find('.mynd_titill_artal').text().match(/\d+/g)[0],
					restricted: movie.find('.mynd_aldurstakmark img').attr('alt'),
					imdb: movie.find('.imdbEinkunn').text(),
					image: 'http://kvikmyndir.is' + movie.find('img.poster').attr('src'),
					showtimes: st
				});
			});

		} catch (e) {
			exports.logError( e );
		}

		res.json(200, obj);
		return next();
	});
};