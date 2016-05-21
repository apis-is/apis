import request from 'request'
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

app.get('/petrol', (req, res) => {
  const timestamp = (new Date().toISOString().slice(0, 19)).replace('T', ' ')
  queryData((error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        error: 'github.com refuses to respond or give back data',
      })
    }
		return res.cache().json({
			results: JSON.parse(body).stations,
			timestamp
		})
  })
})
