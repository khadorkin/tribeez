import {Platform} from 'react-native'
import Raven from 'raven-js'
import ReactNativePlugin from 'raven-js/plugins/react-native'

import config, {deviceInfo} from '../common/config'
import router from './router'

ReactNativePlugin(Raven)
Raven.config(config.raven_dsn, {
  release: deviceInfo.appVersion,
  serverName: deviceInfo.uniqueId,
}).install()

const init = () => {
  const originalHandler = global.ErrorUtils.getGlobalHandler()

  const handler = (error) => {
    issue(error, 'uncaught')
    if (originalHandler) {
      originalHandler(error)
    }
  }
  global.ErrorUtils.setGlobalHandler(handler)
}

const setUser = (id, user, tribe) => {
  Raven.setUserContext({
    id,
    email: user.email,
    name: user.name,
    lang: user.lang,
    tribe,
  })
}

const clearUser = () => {
  Raven.setUserContext()
}

const issue = (error, context) => {
  const route = router.getRoute()
  const page = {
    route: route.name,
    props: route.props,
    title: route.title,
  }

  Raven.captureException(error, {
    extra: {
      platform: Platform.OS,
      context,
      deviceInfo,
      page,
    },
  })
}

export default {init, setUser, clearUser, issue}
