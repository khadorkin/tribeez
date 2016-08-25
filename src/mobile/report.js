import {Crashlytics, Answers} from 'react-native-fabric'
import StackTrace from 'stacktrace-js'

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
  Crashlytics.setUserIdentifier(uid)
  Crashlytics.setUserEmail(infos.email)
  Crashlytics.setUserName(infos.name)
  Crashlytics.setString('lang', infos.lang)
  Answers.logLogin('Email', true)
}

const clearUser = () => {
  Crashlytics.setUserIdentifier('(anonymous)')
  Crashlytics.setUserEmail('(anonymous)')
  Crashlytics.setUserName('(anonymous)')
}

const setAttr = (key, value) => {
  key = String(key)
  switch (typeof value) {
    case 'string':
      return Crashlytics.setString(key, value)
    case 'number':
      return Crashlytics.setNumber(key, value)
    case 'boolean':
      return Crashlytics.setBool(key, value)
    default:
      return Crashlytics.setString(key, JSON.stringify(value))
  }
}

const log = (value) => {
  if (value instanceof Error) {
    value = value.stack || value.message
  }
  Crashlytics.log(String(value))
}

const issue = (error, reason) => {
  StackTrace.fromError(error, {offline: true})
  .then((stack) => {
    stack = stack.map((row) => {
      const numbers = row.source.split(':').slice(-2)
      if (!row.lineNumber) {
        row.lineNumber = Number(numbers[0]) || 0
      }
      if (!row.columnNumber) {
        row.columnNumber = Number(numbers[1]) || 0
      }
      return row
    })
    // add a row at the top with more useful info, since this row is the one used by Fabric as the title:
    stack.unshift({
      fileName: error.message,
      functionName: reason,
      lineNumber: 0,
      columnNumber: 0,
    })
    if (__DEV__) {
      console.error('ISSUE REPORT:', error.message, reason) // eslint-disable-line no-console
    } else {
      Crashlytics.recordCustomExceptionName(error.message, reason, stack)
    }
  })
}

const crash = () => {
  Crashlytics.crash()
}

export default {init, setUser, clearUser, setAttr, log, issue, crash}
