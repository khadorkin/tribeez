import {NativeModules} from 'react-native'

let config
if (__DEV__) {
  config = require('../../config.development.json')
} else {
  config = require('../../config.production.json')
}

export const android = NativeModules.RNDeviceInfo
config.android = android

export default config
