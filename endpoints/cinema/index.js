import request from 'request'
import cheerio from 'cheerio'
import app from '../../server'

/**
 * Fetches movies for show today in Icelandic cinemas.
 * response - JSON: Movie data within an 'results' array.
 */
app.get('/cinema', (req, res) => {
  const url = 'http://kvikmyndir.is/bio/syningatimar/'

  request(url, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: `${url} not responding correctly...` })
    }

    let $

    try {
      $ = cheerio.load(body)
    } catch (e) {
      return res.status(500).json({ error: 'Could not load the body with cherrio.' })
    }

    // Base object to be added to
    // and eventually sent as a JSON response.
    const obj = {
      results: [],
    }

    // DOM elements array containing all movies.
    const movies = $('.stimar')

    // Loop through movies
    movies.each(function () {
      // This movie.
      const movie = $(this)

      // Showtimes for JSON
      const showtimes = []

      // Find all theaters and loop through them.
      const theaters = movie.find('[id^="myndbio"]')

      theaters.each(function () {
        // Single theater
        const theater = {
          theater: $(this).find('#bio a').text().trim(),
          schedule: [],
        }

        // Loop through each showtime and
        // add them to the theater schedule.
        $(this).find('.syningartimi_item').each(function () {
          theater.schedule.push($(this).text().trim())
        })

        // Add theater to showtimes array.
        showtimes.push(theater)
      })

      const urls = movie
        .find('img')
        .attr('src')
        .match(/\/images\/poster\/.+\.(jpg|jpeg|png)/ig) || []

      const imgUrl = `http://kvikmyndir.is${urls[0]}`

      const realeasedYear = movie
        .find('.mynd_titill_artal')
        .text()
        .replace('/[()]/g', '')

      // Create an object of info
      // and add it to the 'results' array.
      obj.results.push({
        title: movie.find('.title').remove('.year').html().trim(),
        released: realeasedYear,
        restricted: null,
        imdb: movie.find('.imdbEinkunn').text().trim(),
        imdbLink: movie.find('.imdbEinkunn a').attr('href') ? movie.find('.imdbEinkunn a').attr('href').trim() : '',
        image: imgUrl,
        showtimes,
      })
    })

    return res.cache().json(obj)
  })
})

/**
 * Fetches theaters that are showing movies today.
 * response - JSON: Theater data within an 'results' array.
 */
app.get('/cinema/theaters', (req, res) => {
  const url = 'http://kvikmyndir.is/bio/syningatimar_bio/'

  request(url, (error, response, body) => {
    if (error) return res.status(500).json({ error: `${url} not responding correctly...` })

    // Cheerio declared and then attemted to load.
    let $

    try {
      $ = cheerio.load(body)
    } catch (e) {
      return res.status(500).json({ error: 'Could not load the body with cherrio.' })
    }

    // Base object to be added to
    // and eventually sent as a JSON response.
    const obj = {
      results: [],
    }

    // DOM elements array containing all theaters.
    const theaters = $('.stimar')

    // Loop through theaters
    theaters.each(function () {
      // This theater.
      const theater = $(this)

      // List of movies.
      const movies = []

      // Loop through movies.
      theater.find('#myndbio_new').each(function () {
        // This movie.
        const movie = $(this)

        // Time schedule.
        const schedule = []

        // Loop through each showtime on schedule today.
        movie.find('#timi_new div').each(function () {
          // Add time to the schedule.
          schedule.push($(this).find('.syningartimi_item').text().trim())
        })

        // Append new movie to the list of movies.
        movies.push({
          title: movie.find('#bio a').text().trim(),
          schedule,
        })
      })

      // Create an object of info
      // and add it to the 'results' array.
      obj.results.push({
        name: theater.find('#mynd_titill a').text().trim(),
        location: theater.find('.mynd_titill_artal').text().trim().replace(/(^\()|(\)$)/g, ''),
        image: `http://kvikmyndir.is${theater.find('.mynd_plakat img').attr('src')}`,
        movies,
      })
    })

    return res.cache().json(obj)
  })
})
