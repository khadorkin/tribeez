import langs from '../resources/langs'

export default {
  getDefault: () => {
    let lang = (navigator.language || navigator.userLanguage || 'en').substr(0, 2).toLowerCase()
    if (!langs.find((item) => (item.code === lang))) {
      lang = 'en'
    }
    return lang
  },
}
