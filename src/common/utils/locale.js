import moment from 'moment'

import {map as langs} from '../constants/langs'

const browserLang = (navigator.language || navigator.userLanguage || 'en').substr(0, 2).toLowerCase()

export const getLang = () => {
  let lang
  try {
    lang = localStorage.getItem('lang')
  } catch (err) {
    // ignore
  }
  if (!lang) {
    lang = browserLang
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
  try {
    localStorage.setItem('lang', lang)
  } catch (err) {
    // ignore
  }
}
