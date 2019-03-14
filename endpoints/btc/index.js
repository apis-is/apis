const request = require('request')
const app = require('../../server')

// set cache time to 1 minute
const cacheTime = 60

function queryGzipJson(url, callback) {
  const headers = {
    'user-agent': 'apis.is',
  }
  request.get({
    headers,
    url,
    gzip: true,
    json: true,
  }, (error, response, data) => {
    if (error || response.statusCode !== 200) {
      callback(error, response, null)
    }
    callback(error, response, data)
  })
}

function queryRate(callback) {
  queryGzipJson('https://myntkaup.is/api/assets/bitcoin', callback)
}

function standardErrorResponse(res) {
  return res.status(500).json({
    error: 'myntkaup.is refuses to respond or give back data',
  })
}

app.get('/btc', (req, res) => {
  queryRate((error, response, data) => {
    if (error || response.statusCode !== 200) {
      return standardErrorResponse(res)
    }
    return res.cache(cacheTime).json(data)
  })
})
