import en from './en'

const fr = {
  welcome: 'Bienvenue',
  register: 'Inscription',
  login: 'Connexion',
  invited_by: '{name} vous a invité',
  'entry.new_user': '{name} a rejoint la tribu !',
  'entry.comments': '{num, plural, =0 {Aucun commentaire} one {# commentaire} other {# commentaires}}', // http://formatjs.io/guides/message-syntax/#plural-format
}

export default Object.assign({}, en, fr) // to have English as a fallback
