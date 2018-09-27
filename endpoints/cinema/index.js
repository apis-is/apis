const request = require('request')
const cheerio = require('cheerio')
const app = require('../../server')

const theatersMetaData = require('./theaters')

// Utility function
const scrapeImage = (src) => {
  const urls = src.match(/\/images\/poster\/.+\.(jpg|jpeg|png)/ig) || null
  return urls === null ? null : `http://kvikmyndir.is${urls[0]}`
}

const scrapeMovieCinemaShowtimes = ($) => {
  // Base object to be added to and eventually sent as a JSON response.
  const obj = {
    results: []
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
    const theaters = movie.find('[class^="biotimar"]')

    theaters.each(function () {
      // Single theater
      const theater = {
        theater: $(this).find('h3').text().trim(),
        schedule: [],
      }

      // Loop through each showtime and add them to the theater schedule.
      $(this).find('ul.time li').each(function () {
        // Remove all VIP badge, Icelandic badge and making the time clean
        $(this).find('.tegund, .salur').remove()
        theater.schedule.push($(this).text().trim())
      })

      // Add theater to showtimes array.
      showtimes.push(theater)
    })

    const releasedYear = movie.find('.title .year').text().trim()
    // After scraping the year, it's removed so we can scrape the title without the year in it
    movie.find('.year').remove()
    const movieTitle = movie.find('.title').text().trim()

    const src = movie.find('img').attr('src')
    const movieImage = src ? scrapeImage(src) : null

    // Create an object of info and add it to the 'results' array.
    obj.results.push({
      title: movieTitle,
      released: releasedYear,
      restricted: movie.find('.aldur').text().trim().replace(/\s{2,}/g, ' '),
      imdb: movie.find('.imdb-einkunn').text().trim(),
      image: movieImage,
      showtimes,
    })
  })

  return obj
}

const flipMoviesToTHeaters = (objCinema) => {
  // DOM elements array containing all theaters.
  const theaters = []

  objCinema.results.forEach((item) => {
    item.showtimes.forEach((showtime) => {
      const movie = {
        title: item.title,
        schedule: showtime.schedule
      }

      // Check if the same theater is in the array, otherwise add the theater to the array
      const theaterIndex = theaters.findIndex(theater =>
        theater.name === showtime.theater
      )
      if (theaterIndex === -1) {
        theaters.push({
          name: showtime.theater,
          movies: [movie]
        })
      } else {
        theaters[theaterIndex].movies.push(movie)
      }
    })
  })

  const obj = {
    results: theaters.map(theater => {
      // Finding correct meta data and merge the objects into one
      return Object.assign(
        {},
        theatersMetaData.find(item => item.name === theater.name),
        theater
      )
    })
  }

  return obj
}

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

    // Cheerio declared and then attemted to load.
    let $
    try {
      $ = cheerio.load(body)
    } catch (e) {
      return res.status(500).json({ error: 'Could not load the body with cherrio.' })
    }

    // Returning list of movies with theaters and showtimes
    const obj = scrapeMovieCinemaShowtimes($)

    return res.cache().json(obj)
  })
})

/**
 * Fetches theaters that are showing movies today.
 * response - JSON: Theater data within an 'results' array.
 */
app.get('/cinema/theaters', (req, res) => {
  const url = 'http://kvikmyndir.is/bio/syningatimar/'
  request(url, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: `${url} not responding correctly...` })
    }

    // Cheerio declared and then attemted to load.
    let $
    try {
      $ = cheerio.load(body)
    } catch (e) {
      return res.status(500).json({ error: 'Could not load the body with cherrio.' })
    }

    // Returning list of movies with theaters and showtimes
    const objMoviesShowtime = scrapeMovieCinemaShowtimes($)

    // Flip it to list of theater with movies and showtimes
    const objTheatersShowtime = flipMoviesToTHeaters(objMoviesShowtime)

    return res.cache().json(objTheatersShowtime)
  })
})
