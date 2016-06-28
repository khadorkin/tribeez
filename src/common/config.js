let config
if (__DEV__) {
  config = require('../../config.development.json')
} else {
  config = require('../../config.production.json')
}

config.android_package = 'net.tribeez'
config.version = 1

module.exports = config
