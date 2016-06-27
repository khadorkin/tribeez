let config
if (__DEV__) {
  config = require('../../config.development.json')
} else {
  config = require('../../config.production.json')
}

config.android_package = 'com.mytribe'
config.version = 4 // keep in sync with versionCode /android/app/build.gradle

module.exports = config
