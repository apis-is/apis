/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const _ = require('lodash')
const makeDebug = require('debug')
const defaultConfig = require('./default.json')

const debug = makeDebug('config')

let env = process.env.NODE_ENV
let envConfig = {}

if (process.env.INTEGRATION) {
  env = 'integration'
}

try {
  envConfig = require(`./${env}.json`)
} catch (e) {
  switch (e.code) {
    case 'MODULE_NOT_FOUND':
      debug('Please create a dev.config.json file in the config folder')
      break
    default:
      debug(e)
      break
  }
}

module.exports = _.extend(defaultConfig, envConfig)
