import Locale from 'react-native-locale'
import moment from 'moment'

import {map as langs} from '../resources/langs'

const deviceLang = Locale.constants().localeIdentifier.substr(0, 2).toLowerCase()

export const getLang = () => {
  let lang
  if (window.localStorage) {
    lang = localStorage.getItem('lang')
  }
  if (!lang) {
    lang = deviceLang
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
