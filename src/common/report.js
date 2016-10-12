const extra = {}

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

const issue = (error, reason) => {
  if (window.Rollbar) {
    const errorStr = (error.code || error.message || error.toString()) //TODO: improve
    Rollbar.error(reason + ': ' + errorStr, extra)
  }
}
export default {setUser, clearUser, setAttr, issue}
