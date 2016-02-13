var request = require('request');
var cheerio = require('cheerio');
var app = require('../../server');

/**
 * Fetches movies for show today in Icelandic cinemas.
 * response - JSON: Movie data within an 'results' array.
 */
app.get('/cinema', function(req, res, next) {
  var url = 'http://kvikmyndir.is/bio/syningatimar/';

  request(url, function(error, response, body) {
    if (error) {
      return res.status(500).json({error: url + ' not responding correctly...'});
    }

    // Cheerio declared and then attemted to load.
    var $;
    try {
      $ = cheerio.load(body);
    } catch (e) {
      return res.status(500).json({error:'Could not load the body with cherrio.'});
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
          theater.schedule.push($(this).text().trim());
        });

        // Add theater to showtimes array.
        showtimes.push(theater);
      });

      // Clean up image URL
      var imgURL = null;

      var urls =  movie
        .find('img.poster')
        .attr('src')
        .match(/\/images\/poster\/.+\.(jpg|jpeg|png)/ig);

      if (urls && urls.length > 0) {
        imgUrl = urls[0];
      }

      var realeasedYear = movie
        .find('.mynd_titill_artal')
        .text()
        .replace('/[()]/g', '');

      // Create an object of info
      // and add it to the 'results' array.
      obj.results.push({
        title: movie.find('#mynd_titill a').html().trim(),
        released: realeasedYear,
        restricted: movie.find('.mynd_aldurstakmark img').attr('alt').trim(),
        imdb: movie.find('.imdbEinkunn').text().trim(),
        imdbLink: movie.find('.imdbEinkunn a').attr('href') ? movie.find('.imdbEinkunn a').attr('href').trim() : '',
        image: 'http://kvikmyndir.is' + imgURL,
        showtimes: showtimes
      });
    });

    return res.cache().json(obj);
  });
});

/**
 * Fetches theaters that are showing movies today.
 * response - JSON: Theater data within an 'results' array.
 */
app.get('/cinema/theaters', function (req, res, next) {
  var url = 'http://kvikmyndir.is/bio/syningatimar_bio/';

  request(url, function (error, response, body) {
    if (error) return res.status(500).json({error: url + ' not responding correctly...' });

    // Cheerio declared and then attemted to load.
    var $;

    try {
      $ = cheerio.load( body );
    } catch (e) {
      return res.status(500).json({error:'Could not load the body with cherrio.'});
    }

    // Base object to be added to
    // and eventually sent as a JSON response.
    var obj = {
      results: []
    };

    // DOM elements array containing all theaters.
    var theaters = $('.Kvikmyndir_TimeTable').find('#utanumMynd_new');

    // Loop through theaters
    theaters.each(function() {
      // This theater.
      var theater = $(this);

      // List of movies.
      var movies = [];

      // Loop through movies.
      theater.find('#myndbio_new').each(function() {
        // This movie.
        var movie = $(this);

        // Time schedule.
        var schedule = [];

        // Loop through each showtime on schedule today.
        movie.find('#timi_new div').each(function() {
          // Add time to the schedule.
          schedule.push($(this).find('.syningartimi_item').text().trim());
        });

        // Append new movie to the list of movies.
        movies.push({
          title: movie.find('#bio a').text().trim(),
          schedule: schedule
        });
      });

      // Create an object of info
      // and add it to the 'results' array.
      obj.results.push({
        name: theater.find('#mynd_titill a').text().trim(),
        location: theater.find('.mynd_titill_artal').text().trim().replace(/(^\()|(\)$)/g, ''),
        image: 'http://kvikmyndir.is' + theater.find('.mynd_plakat img').attr('src'),
        movies: movies
      });
    });

    return res.cache().json(obj);
  });
});
