import fcm from 'react-native-fcm'

let offToken

const subscribeToken = (callback) => {
  if (offToken) {
    // ignore silently
    return
  }
  const onToken = (token) => {
    if (token) {
      callback(token)
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
}

export default {
  requestPermissions: fcm.requestPermissions,
  subscribeToken,
  unsubscribeToken,
}
