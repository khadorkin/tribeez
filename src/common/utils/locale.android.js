import moment from 'moment'

import {map as langs} from '../constants/langs'

import {deviceInfo} from '../config'

export const getLang = () => {
  let lang = deviceInfo.deviceLocale.substr(0, 2).toLowerCase()
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
}
