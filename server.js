/**
 * Only for apis.is production environment
 */
if (process.env.NODE_ENV === 'production') {
  process.chdir('/apis/current')
}

import express from 'express'
import expressMetrics from 'express-metrics'

import fileModule from 'file'
import { EventEmitter as EE } from 'events'

import statuses from 'statuses'

import config from './config'
import cache from './lib/cache'
import cors from './lib/cors'

import makeDebug from 'debug'

const debug = makeDebug('server')
const app = express()

app.use(expressMetrics({
  port: 8091,
}))

module.exports = app

/**
 * Set the spacing to 0 for shorter output
 */
app.set('json spaces', 0)

/**
 * Create an event listener for app
 */
EE.call(app)

/**
 * Cross-origin resource sharing
 */
app.use(cors())

/**
 * Caching layer
 */
app.use(cache())

/**
 * Set up endpoints
 */
fileModule.walkSync('./endpoints', (dirPath, dirs, endpoints) => {
  function requireEndpoint(endpoint) {
    if (endpoint.indexOf('.DS_Store') === -1) {
      require(`./${dirPath}/${endpoint}`)
    }
  }

  if (endpoints && dirPath.indexOf('test') < 0) {
    endpoints.forEach(requireEndpoint)
  }
})

app.use((error, req, res) => {
  let code = 500
  let message = 'Unknown error'

  if (res.headersSent) {
    message = 'Headers already sent'
  }

  if (typeof error === 'number') {
    code = error
    message = statuses[code] || message
  } else if (
    typeof error === 'object' &&
    error.message &&
    error.message.length === 3 &&
    !isNaN(error.message)) {
    code = error.message
    message = statuses[code] || message
  } else {
    // Other errors that might have been swallowed
    debug(error.stack)
    message = error.message
  }

  code = parseInt(code, 10)

  res.status(code).json({ error: message })
})

/**
 * Start the server
 */
app.listen(config.port, () => {
  app.emit('ready')
})

app.on('ready', () => {
  if (!config.testing) {
    debug('Server running at port:', config.port)
  }
})
