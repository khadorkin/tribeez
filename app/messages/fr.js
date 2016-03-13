import en from './en'

const fr = {
  // titles
  welcome: 'Bienvenue',
  register: 'Inscription',
  join: 'Rejoindre',
  login: 'Connexion',
  password: 'Mot de passe perdu',
  reset: 'Nouveau mot de passe',
  activity: 'Activité',
  profile: 'Profil',
  members: 'Membres',
  members_new: 'Nouveau membre',
  bills: 'Factures',
  bills_new: 'Nouvelle facture',
  events: 'Évènements',
  events_new: 'Nouvel évènement',
  tasks: 'Tâches',
  tasks_new: 'Nouvelle tâche',
  notes: 'Notes',
  notes_new: 'Nouvelle note',
  polls: 'Sondages',
  polls_new: 'Nouveau sondage',
  tribe: 'Tribu',
  tribe_new: 'Nouvelle tribu',

  // login/register forms
  invited_you: '{name} vous a invité',
  you: 'Vous',
  your_tribe: 'Votre tribu',

  // Members
  'add_member': 'Ajouter un membre',

  // Activity
  'entry.new_user': '{name} a rejoint la tribu !',
  'entry.new_user.item': '{name} (invité-e par {item}) a rejoint la tribu !',
  'entry.comments': '{num, plural, =0 {Aucun commentaire} one {# commentaire} other {# commentaires}}', // http://formatjs.io/guides/message-syntax/#plural-format
}

export default {...en, ...fr} // to have English as a fallback
