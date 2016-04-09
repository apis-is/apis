import _ from 'lodash'
import makeDebug from 'debug'
import defaultConfig from './default.json'

const debug = makeDebug('config')

let env = process.env.NODE_ENV ? `${process.env.NODE_ENV}.config` : 'dev.config'
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
