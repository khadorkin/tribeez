if (__DEV__) {
  module.exports = require('../../config.development.json')
} else {
  module.exports = require('../../config.production.json')
}
