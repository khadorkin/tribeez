import {Platform} from 'react-native'
import StackTrace from 'stacktrace-js'

import config, {deviceInfo} from '../common/config'
import router from './router'

const person = {}

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

const setUser = (uid, infos) => {
  person.id = uid
  person.email = infos.email
  person.name = infos.name
  person.lang = infos.lang
}

const clearUser = () => {
  delete person.id
  delete person.email
  delete person.name
  delete person.lang
}

const setAttr = (key, value) => {
  person[key] = value
}

const issue = (error, context) => {
  if (__DEV__) {
    if (context !== 'uncaught') {
      console.error('ISSUE REPORT:', error.message, context) // eslint-disable-line no-console
    } // else it's handled by react native
  } else {
    StackTrace.fromError(error, {offline: true})
    .then((stack) => {
      const frames = stack.map((frame) => {
        return {
          filename: frame.fileName,
          lineno: frame.lineNumber,
          colno: frame.columnNumber,
          method: frame.functionName,
        }
      })

      const route = router.getRoute()

      const params = {
        access_token: config.rollbar_token,
        data: {
          environment: (__DEV__ ? 'development' : 'production'),
          code_version: deviceInfo.appVersion,
          platform: Platform.OS,
          framework: Platform.OS,
          context,
          body: {
            trace: {
              frames,
              exception: {
                class: error.name,
                message: error.message,
              },
            },
          },
          person,
          custom: {
            device: deviceInfo,
            page: {
              route: route.name,
              props: route.props,
              title: route.title,
            },
          },
        },
      }

      fetch('https://api.rollbar.com/api/1/item/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
      .then((response) => {
        if (__DEV__ && response.status >= 400) {
          console.error('Rollbar response status is ' + response.status) // eslint-disable-line no-console
        }
      })
    })
  }
}

export default {init, setUser, clearUser, setAttr, issue}
