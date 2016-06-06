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
    Connection: 'keep-alive',
    Host: 'gist.github.com',
    Pragma: 'no-cache',
    'Upgrade-Insecure-Requests': 1,
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

function parseTimestamps(htmlText) {
  const data = $(htmlText)
  return {
    lastPriceChanges: data.find('#file-prices_changed_timestamp-LC1').text().slice(0, 23),
    lastPriceCheck: data.find('#file-prices_lookup_timestamp-LC1').text().slice(0, 23),
  }
}

app.get('/petrol', (req, res) => {
  const timestampApis = (new Date().toISOString().slice(0, 23))
  const nineMinutes = 900
  queryData((error1, response1, jsonText) => {
    if (error1 || response1.statusCode !== 200) {
      return res.status(500).json({
        error: 'raw.githubusercontent.com refuses to respond or give back data',
      })
    }
    const results = JSON.parse(jsonText).stations
    queryTimestamps((error2, response2, htmlText) => {
      if (error2 || response2.statusCode !== 200) {
        return res.cache(nineMinutes).json({
          results,
          timestampApis,
          timestampPriceChanges: null,
          timestampPriceCheck: null,
        })
      }
      const timestamps = parseTimestamps(htmlText)
      return res.cache(nineMinutes).json({
        results,
        timestampApis,
        timestampPriceChanges: timestamps.lastPriceChanges,
        timestampPriceCheck: timestamps.lastPriceCheck,
      })
    })
  })
})
