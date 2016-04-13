// base messages: this file is the fallback for other langs

export default {
  // titles
  welcome: 'Welcome',
  register: 'Register',
  join: 'Join',
  login: 'Login',
  password: 'Lost password',
  reset: 'Password update',
  activity: 'Activity',
  profile: 'Profile',
  members: 'Members',
  members_new: 'New member',
  bills: 'Bills',
  bills_new: 'New bill',
  bills_edit: 'Edit bill',
  events: 'Events',
  events_new: 'New event',
  events_edit: 'Edit event',
  tasks: 'Tasks',
  tasks_new: 'New task',
  notes: 'Notes',
  notes_new: 'New note',
  polls: 'Polls',
  polls_new: 'New poll',
  polls_edit: 'Edit poll',
  tribe: 'Tribe',
  tribe_new: 'New tribe',

  // dates
  datetime: 'On {date, date, long} at {date, time, short}',

  // actions
  cancel: 'Cancel',

  // snack messages
  'snack.password_changed': 'Password changed',
  'snack.profile_updated': 'Profile updated',
  'snack.tribe_created': 'Tribe created',
  'snack.tribe_updated': 'Tribe updated',
  'snack.invite_sent': 'Invite sent',
  'snack.invite_resent': 'Invite sent again',
  'snack.NEW_BILL': '{author, select, _you_ {Bill created} other {{author} created the "{name}" bill}}',
  'snack.UPDATE_BILL': '{author, select, _you_ {Bill updated} other {{author} updated the "{name}" bill}}',
  'snack.DELETE_BILL': '{author, select, _you_ {Bill deleted} other {{author} deleted the "{name}" bill}}',
  'snack.note_created': 'Note created',
  'snack.note_updated': 'Note saved',
  'snack.notes_reordered': 'Notes reordered',
  'snack.note_deleted': 'Note deleted',
  'snack.NEW_EVENT': '{author, select, _you_ {Event created} other {{author} created the "{name}" event}}',
  'snack.UPDATE_EVENT': '{author, select, _you_ {Event updated} other {{author} updated the "{name}" event}}',
  'snack.DELETE_EVENT': '{author, select, _you_ {Event deleted} other {{author} deleted the "{name}" event}}',
  'snack.NEW_POLL': '{author, select, _you_ {Poll created} other {{author} created the "{name}" poll}}',
  'snack.UPDATE_POLL': '{author, select, _you_ {Poll updated} other {{author} updated the "{name}" poll}}',
  'snack.DELETE_POLL': '{author, select, _you_ {Poll deleted} other {{author} deleted the "{name}" poll}}',
  'snack.voted': 'Voted',
  'snack.logout_success': 'You have been logged out',
  'snack.error': 'Error: please try again',

  // login/register forms
  invited_you: '{name} invited you',
  login_to_join: '{inviter} invited you to join {tribe}',
  you: 'You',
  your_tribe: 'Your tribe',
  // login :
  'error.login.email': 'Unknown email address',
  'error.login.password': 'Wrong password',
  // register/join:
  'error.user.name': 'Invalid user name',
  'error.email_empty': 'An email address is required',
  'error.email_invalid': 'Invalid email address',
  'error.email_invalid_suggestion': 'Invalid address. Did you mean {suggestion}?',
  'error.email_exists': 'This email address is already registered',
  'error.password': 'Invalid password',
  'error.password2': 'Passwords do not match',
  'error.lang': 'Invalid language',
  'error.tribe_name': 'Invalid tribe name',
  'error.city': 'Please choose a city in the dropdown suggestions list',
  'error.currency': 'Please choose a currency',
  'error.tribe_type': 'Please choose a tribe type',
  'error.captcha': 'Invalid captcha',
  // bill:
  'label.part': '{name}\'s share',
  'error.payer': 'Please indicate who paid this',
  'error.name': 'Invalid name',
  'error.description': 'Invalid description',
  'error.amount': 'Invalid amount',
  'error.amount_mismatch': 'The bill amount must match the sum of the shares',
  'error.no_parts': 'You must distribute at least one share',
  // poll:
  'error.no_options': 'You must give at lease two options',
  // common:
  'error.other': 'Request error: please try again later',
  'submit.tribe.create': 'Create tribe',
  'submit.tribe.update': 'Update tribe',

  // Members
  'add_member': 'Add a member',
  'member_since': 'Member since {date}',
  'invited_by': 'Invited by {user} on {date}',

  // Activity
  'entry.user.new': '{author, select, _you_ {You} other {{author}}} joined the tribe!',
  'entry.user.new.infos': 'Invited by {inviter}',
  'entry.bill.new': '{author, select, _you_ {You} other {{author}}} added a bill named "{name}" ({amount})',
  'entry.bill.new.infos': 'Your share is {amount}',
  'entry.bill.new.stranger': 'You are not concerned',
  'entry.bill.edit': '{author, select, _you_ {You} other {{author}}} modified the "{name}" bill ({amount})',
  'entry.bill.edit.infos': 'Your share is now {amount}',
  'entry.bill.edit.stranger': 'You are not concerned',
  'entry.bill.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" bill ({amount})',
  'entry.bill.delete.infos': 'Your share was {amount}',
  'entry.bill.delete.stranger': 'You were not concerned',
  'entry.poll.new': '{author, select, _you_ {You} other {{author}}} added a poll named "{name}"',
  'entry.poll.edit': '{author, select, _you_ {You} other {{author}}} modified the "{name}" poll',
  'entry.poll.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" poll',
  'entry.event.new': '{author, select, _you_ {You} other {{author}}} added an event named "{name}" starting {when}',
  'entry.event.edit': '{author, select, _you_ {You} other {{author}}} modified the "{name}" event starting {when}',
  'entry.event.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" event starting {when}',
  'entry.comments': '{num, plural, =0 {No comments} one {# comment} other {# comments}}', // http://formatjs.io/guides/message-syntax/#plural-format
  comment: 'Your comment...',

  // Bills
  'bill.mypart': 'Your share is {amount}',
  'bill.nopart': 'You are not concerned',

  // Calendar
  'calendar.allDay': 'All day',
  'calendar.previous': 'Previous',
  'calendar.next': 'Next',
  'calendar.today': 'Today',
  'calendar.month': 'Month',
  'calendar.week': 'Week',
  'calendar.day': 'Day',
  'calendar.agenda': 'Agenda',
}
