import fcm from 'react-native-fcm'

let offToken
let _token

const subscribeToken = (callback) => {
  if (offToken) {
    // ignore silently
    return
  }
  const onToken = (token) => {
    if (token) {
      callback(token)
      _token = token
    }
  }
  fcm.getFCMToken().then(onToken)
  offToken = fcm.on('refreshToken', onToken)
}

const unsubscribeToken = () => {
  if (offToken) {
    offToken()
    offToken = null
  }
  _token = null
}

const getToken = () => {
  return _token
}

export default {
  requestPermissions: fcm.requestPermissions,
  subscribeToken,
  unsubscribeToken,
  getToken,
}
