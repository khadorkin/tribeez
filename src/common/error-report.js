const extra = {}

export const initHandler = () => {
  log('Already intialized in index.html')
}

export const setUser = (uid, infos) => {
  extra.user = uid
  extra.email = infos.email
  extra.name = infos.name
  extra.lang = infos.lang
}

export const clearUser = () => {
  delete extra.user
  delete extra.email
  delete extra.name
  delete extra.lang
}

export const setAttr = (key, value) => {
  extra[key] = value
}

export const log = (value) => {
  /*eslint-disable no-console*/
  if (window.console && console.warn) {
    console.warn('[error-report]', value)
  }
  /*eslint-enable no-console*/
}

export const reportIssue = (error, reason) => {
  if (window.Rollbar) {
    const errorStr = (error.code || error.message || error.toString()) //TODO: improve
    Rollbar.error(reason + ': ' + errorStr, extra)
  }
}

export const crash = () => {
  log('CRASH')
}
