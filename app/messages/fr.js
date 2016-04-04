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
  bills_edit: 'Modifier la facture',
  events: 'Évènements',
  events_new: 'Nouvel évènement',
  events_edit: 'Modifier l’évènement',
  tasks: 'Tâches',
  tasks_new: 'Nouvelle tâche',
  notes: 'Notes',
  notes_new: 'Nouvelle note',
  polls: 'Sondages',
  polls_new: 'Nouveau sondage',
  tribe: 'Tribu',
  tribe_new: 'Nouvelle tribu',

  // dates
  datetime: 'Le {date, date, long} à {date, time, short}',

  // login/register forms
  invited_you: '{name} vous a invité',
  you: 'Vous',
  your_tribe: 'Votre tribu',

  // Members
  'add_member': 'Ajouter un membre',

  // Activity
  'entry.user.new': '{author, select, _you_ {Vous avez} other {{author} a}} rejoint la tribu !',
  'entry.user.new.infos': 'Invité-e par {inviter}',
  'entry.comments': '{num, plural, =0 {Aucun commentaire} one {# commentaire} other {# commentaires}}', // http://formatjs.io/guides/message-syntax/#plural-format

  // Calendar
  'calendar.allDay': 'Journée',
  'calendar.previous': 'Prédécent',
  'calendar.next': 'Suivant',
  'calendar.today': 'Aujourd’hui',
  'calendar.month': 'Mois',
  'calendar.week': 'Semaine',
  'calendar.day': 'Jour',
  'calendar.agenda': 'Agenda',
}

export default {...en, ...fr} // to have English as a fallback
