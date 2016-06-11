// configure error reporting with Sentry via Raven
import Raven from 'raven-js'
import plugin from 'raven-js/plugins/react-native'
plugin(Raven)

import config from './src/common/config'
import pkg from './package.json'
Raven.config(config.sentry_dsn, {release: pkg.version}).install()

import {AppRegistry} from 'react-native'

import Index from './src/mobile/index'

AppRegistry.registerComponent('mytribe', () => Index)
