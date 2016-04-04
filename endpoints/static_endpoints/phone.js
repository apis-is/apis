function phone(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.status(410).json({
    error: 'This api endpoint has been closed and it will not be available in the foreseeable future.',
  })
  next()
}

exports.setup = function (server) {
  server.post({ path: '/phone', version: '1.0.0' }, phone)
  server.get({ path: '/phone', version: '1.0.0' }, phone)
  server.post({ path: '/phone', version: '2.0.0' }, phone)
  server.get({ path: '/phone', version: '2.0.0' }, phone)
}
