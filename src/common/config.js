let config
if (__DEV__) {
  config = require('../../config.development.json')
} else {
  config = require('../../config.production.json')
}

export default config
