module.exports = function cors() {
  return (req, res, next) => {
    const allowedHeaders = [
      'X-Requested-With',
      'Accept',
      'Origin',
      'Referer',
      'User-Agent',
      'Content-Type',
      'Authorization',
      'X-Mindflash-SessionID',
    ]

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', allowedHeaders.join(', '))

    if (req.method !== 'OPTIONS') {
      return next()
    }

    return res.sendStatus(200)
  }
}
