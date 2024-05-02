
async function request(options, callback) {
  if (typeof options === 'string') {
    options = {
      url: options
    }
  }

  let { url, qs, ...otherOptions } = options

  // add query strings to url
  if (qs) {
    const params = new URLSearchParams(qs);
    url += '?' + params.toString()
  }

  let response, text
  try {
    console.log('fetching', url, otherOptions)
    response = await fetch(url, otherOptions)
    text = await response.text()
  } catch (error) {
    return callback(error)
  }

  response.statusCode = response.status

  return callback(null, response, text)
}

function get(options, callback) {
  return request({
    ...options,
    method: 'GET'
  }, callback)
}

request.get = get
module.exports = request
