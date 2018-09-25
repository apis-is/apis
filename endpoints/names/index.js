/* eslint-disable import/first */
/*
About:   An API for all names that are allowed in Iceland. Names are devided into
          male names, female names and middle names
Author:  Hjörtur Líndal Stefánsson
Email:   hjorturls@gmail.com
Created: August 2014
*/

const request = require('request')
const h = require('apis-helpers')
const cheerio = require('cheerio')
const app = require('../../server')

/* Handles the request for a specific request URL */
function handleRequest(providedUrl, req, res) {
  let $
  // Check for the search parameter
  const search = req.params.search || req.query.search || req.query.filter || ''

  // Add search if it is requested
  let url = providedUrl || ''
  if (search !== '') {
    url += `&Nafn=${search}`
  }

  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ error: 'www.island.is refuses to respond or give back data' })
    }

    try {
      $ = cheerio.load(body)
    } catch (exc) {
      return res.status(500).json({ error: 'Could not parse body' })
    }

    const obj = { results: [] }

    // Clear data regarding the acceptance date of the name (not needed)
    $('.dir li i').remove()

    // Loop through all the names in the list and add them to our array
    $('.dir li').each((i, el) => {
      const name = $(el).text().trim()
      obj.results.push(name)
    })

    // Return the results as JSON and cache for 24 hours
    return res.cache(86400).json(obj)
  })
}

/* Root names handler - only returns a list of resources */
app.get('/names', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Samthykkt=yes'
  return handleRequest(url, req, res)
})

/* Get all legal names for males */
app.get('/names/males/:search?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Drengir=on&Samthykkt=yes'
  return handleRequest(url, req, res)
})

/* Get all legal names for females */
app.get('/names/females/:search?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Stulkur=on&Samthykkt=yes'
  return handleRequest(url, req, res)
})

/* Get all legal middle names */
app.get('/names/middlenames/:search?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Millinofn=on&Samthykkt=yes'
  return handleRequest(url, req, res)
})

/* Get all rejected names for males */
app.get('/names/rejected/males/:search?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Drengir=on&Samthykkt=no'
  return handleRequest(url, req, res)
})

/* Get all rejected names for females */
app.get('/names/rejected/females/:search?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Stulkur=on&Samthykkt=no'
  return handleRequest(url, req, res)
})

/* Get all rejected middle names */
app.get('/names/rejected/middlenames/:search?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Millinofn=on&Samthykkt=no'
  return handleRequest(url, req, res)
})

/* Get all rejected names */
app.get('/names/rejected/:search?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Stulkur=on&Drengir=on&Millinofn=on&Samthykkt=no'
  return handleRequest(url, req, res)
})

/* Get all names with a given search */
app.get('/names/:search', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Samthykkt=yes'
  return handleRequest(url, req, res)
})
