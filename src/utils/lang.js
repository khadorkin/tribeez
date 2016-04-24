import langs from '../resources/langs'

import moment from 'moment'

export default {
  get: () => {
    let lang
    if (window.localStorage) {
      lang = localStorage.getItem('lang')
    }
    if (!lang) {
      lang = (navigator.language || navigator.userLanguage || 'en').substr(0, 2).toLowerCase()
    }
    if (!langs.find((item) => (item.code === lang))) {
      lang = 'en'
    }
    return lang
  },
  set: (lang) => {
    moment.locale(lang)
    if (window.localStorage) {
      localStorage.setItem('lang', lang)
    }
  },
}
