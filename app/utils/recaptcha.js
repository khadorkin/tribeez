import scriptLoader from './scriptLoader'

/*global grecaptcha:false __RECAPTCHA_SITE_KEY__:false*/

const mount = (nodeId, onResponse, onExpired) => {
  window.onRecaptcha = () => {
    grecaptcha.render(nodeId, {
      sitekey: __RECAPTCHA_SITE_KEY__,
      callback: () => {
        onResponse(grecaptcha.getResponse())
      },
      'expired-callback': onExpired,
    })
  }
  if (window.grecaptcha) {
    window.onRecaptcha()
  } else {
    scriptLoader.load('https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptcha')
  }
}

const reset = () => {
  grecaptcha.reset()
}

export default {mount, reset}
