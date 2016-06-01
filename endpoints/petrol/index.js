import request from 'request'
import $ from 'cheerio'
import h from 'apis-helpers'
import app from '../../server'

function queryData(callback) {
  const url = 'https://raw.githubusercontent.com/gasvaktin/gasvaktin/master/vaktin/gas.min.json'
  const headers = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.8,is;q=0.6',
    'Cache-Control': 'max-age=0',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': h.browser(),
  }
  request.get({
    headers,
    url,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      callback(error, response, '')
    }
    callback(error, response, body)
  })
}

function queryTimestamps(callback) {
  const url = 'https://gist.github.com/gasvaktin'
  const headers = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.8,is;q=0.6',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    Host: 'gist.github.com',
    Pragma: 'no-cache',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': h.browser()
  }
  request.get({
    headers,
    url,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      callback(error, response, '')
    }
    callback(error, response, body)
  })
}

function parseTimestamps(htmlPage) {
  const data = $(htmlPage)
  return {
    'last_pricechanges': data.find('#file-prices_changed_timestamp-LC1').text().slice(0, 23),
    'last_pricecheck': data.find('#file-prices_lookup_timestamp-LC1').text().slice(0, 23)
  }
}

app.get('/petrol', (req, res) => {
  const timestamp_apis = (new Date().toISOString().slice(0, 23))
  const nine_minutes = 900
  queryData((error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        error: 'raw.githubusercontent.com refuses to respond or give back data',
      })
    }
    const results = JSON.parse(body).stations
    queryTimestamps((error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.cache(nine_minutes).json({
          results,
          timestamp_apis,
          timestamp_pricechanges: null,
          timestamp_pricecheck: null,
        })
      }
      const timestamps = parseTimestamps(body)
      return res.cache(nine_minutes).json({
        results,
        timestamp_apis,
        timestamp_last_pricechanges: timestamps.last_pricechanges,
        timestamp_last_pricecheck: timestamps.last_pricecheck,
      })
    })
  })
})
