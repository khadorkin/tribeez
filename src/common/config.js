let config
if (__DEV__) {
  config = require('../../config.development.json')
} else {
  config = require('../../config.production.json')
}

config.android = {
  package: 'net.tribeez',
  versionCode: 2,
  versionName: '0.2',
}

module.exports = config
