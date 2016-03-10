import {list as langs} from '../resources/langs'

export default {
  getDefault: () => {
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
  setDefault: (lang) => {
    if (window.localStorage) {
      localStorage.setItem('lang', lang)
    }
  },
}
