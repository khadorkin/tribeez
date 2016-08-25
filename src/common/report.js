const extra = {}

const init = () => {
  log('Already intialized in index.html')
}

const setUser = (uid, infos) => {
  extra.user = uid
  extra.email = infos.email
  extra.name = infos.name
  extra.lang = infos.lang
}

const clearUser = () => {
  delete extra.user
  delete extra.email
  delete extra.name
  delete extra.lang
}

const setAttr = (key, value) => {
  extra[key] = value
}

const log = (value) => {
  if (window.console) {
    console.warn('[report]', value) // eslint-disable-line no-console
  }
}

const issue = (error, reason) => {
  if (window.Rollbar) {
    const errorStr = (error.code || error.message || error.toString()) //TODO: improve
    Rollbar.error(reason + ': ' + errorStr, extra)
  }
}

const crash = () => {
  log('CRASH')
}

export default {init, setUser, clearUser, setAttr, log, issue, crash}
