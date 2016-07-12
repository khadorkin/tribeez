import {map as langs} from '../resources/langs'

import moment from 'moment'

export const getLang = () => {
  let lang
  if (window.localStorage) {
    lang = localStorage.getItem('lang')
  }
  if (!lang) {
    lang = (navigator.language || navigator.userLanguage || 'en').substr(0, 2).toLowerCase()
  }
  if (!langs[lang]) {
    lang = 'en'
  }
  return lang
}

export const setLang = (lang) => {
  switch (lang) {
    case 'fr':
      require('moment/locale/fr')
      break
    default:
      moment.locale('en')
      break
  }
  if (window.localStorage) {
    localStorage.setItem('lang', lang) //TODO: mobile
  }
}
