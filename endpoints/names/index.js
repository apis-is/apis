/*
About:   An API for all names that are allowed in Iceland. Names are devided into
          male names, female names and middle names
Author:  Hjörtur Líndal Stefánsson
Email:   hjorturls@gmail.com
Created: August 2014
*/

import request from 'request'
import h from 'apis-helpers'
import app from '../../server'
import cheerio from 'cheerio'

/* Handles the request for a specific request URL */
function handleRequest(providedUrl, req, res) {
  let $
  // Check for the filter parameter
  const filter = req.params.filter || req.query.filter || req.query.search || ''

  // Add name filtering if it is requested
  let url = providedUrl || ''
  if (filter !== '') {
    url += `&Nafn=${filter}`
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
    $('.dir li i').each(() => {
      $(this).remove()
    })

    // Loop through all the names in the list and add them to our array
    $('.dir li').each(() => {
      const name = $(this).text()
      obj.results.push(name.trim())
    })

    // Return the results as JSON and cache for 24 hours
    return res.cache(86400).json(obj)
  })
}

/* Root names handler - only returns a list of resources */
app.get('/names', (req, res) => {
  return res.json(
    {
      results: [
        {
          // eslint-disable-next-line max-len
          info: 'This is an api that lists all allowed Icelandic names. A search parameter can be used with each endpoint',
          endpoints: {
            males: '/names/males/',
            females: '/names/females/',
            middlenames: '/names/middlenames/',
          },
        },
      ],
    }
  )
})

/* Get all legal names for males */
app.get('/names/males/:filter?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Drengir=on&Samthykkt=yes'
  return handleRequest(url, req, res)
})

/* Get all legal names for females */
app.get('/names/females/:filter?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Stulkur=on&Samthykkt=yes'
  return handleRequest(url, req, res)
})

/* Get all legal middle names */
app.get('/names/middlenames/:filter?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Millinofn=on&Samthykkt=yes'
  return handleRequest(url, req, res)
})

/* Get all rejected names for males */
app.get('/names/rejected/males/:filter?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Drengir=on&Samthykkt=no'
  return handleRequest(url, req, res)
})

/* Get all rejected names for females */
app.get('/names/rejected/females/:filter?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Stulkur=on&Samthykkt=no'
  return handleRequest(url, req, res)
})

/* Get all rejected middle names */
app.get('/names/rejected/middlenames/:filter?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Millinofn=on&Samthykkt=no'
  return handleRequest(url, req, res)
})

/* Get all rejected names */
app.get('/names/rejected/:filter?', (req, res) => {
  const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Stulkur=on&Drengir=on&Millinofn=on&Samthykkt=no'
  return handleRequest(url, req, res)
})
