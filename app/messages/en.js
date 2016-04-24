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
  tasks_edit: 'Edit task',
  notes: 'Notes',
  notes_new: 'New note',
  polls: 'Polls',
  polls_new: 'New poll',
  polls_edit: 'Edit poll',
  tribe: 'Tribe',
  tribe_new: 'New tribe',

  // subtitles
  messenger_bot: 'Facebook Messenger Bot',
  not_found: 'Page not found',
  title: 'Title',
  upcoming_events: 'Upcoming events',
  open_polls: 'Open polls',
  tasks_todo: 'Tasks to do',

  // html:
  sent_reset: 'A reset link has been sent to your email address.<br>Click on that link to reset your password.',

  // dates
  datetime: 'On {date, date, long} at {date, time, short}',

  // actions
  delete: 'Delete',
  send: 'Send',
  cancel: 'Cancel',
  close: 'Close',
  delete_dialog: 'Do you really want to delete this {type}?',
  reinvite_dialog: 'Do you want to send an invite again to this address?',
  vote_again: 'Vote again',
  submit_vote: 'Submit vote',
  return_home: 'Return to Activity',

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
  'snack.poll_updated': 'Poll updated',
  'snack.NEW_TASK': '{author, select, _you_ {Task created} other {{author} created the "{name}" task}}',
  'snack.UPDATE_TASK': '{author, select, _you_ {Task updated} other {{author} updated the "{name}" task}}',
  'snack.DELETE_TASK': '{author, select, _you_ {Task deleted} other {{author} deleted the "{name}" task}}',
  'snack.voted': 'Voted',
  'snack.task_done': 'Task marked as done',
  'snack.logout_success': 'You have been logged out',
  'snack.error': 'Error: please try again',

  // FORMS
  // subtitles:
  password_reset: 'Fill this form to receive a reset link via email',
  password_change: '{name}, please choose a new password',
  invited_you: '{name} invited you',
  login_to_join: '{inviter} invited you to join {tribe}',
  you: 'You',
  your_tribe: 'Your tribe',
  password_lost: 'Lost your password?',
  no_account: 'No account yet?',
  register_now: 'Register now!',
  gravatar: 'To change your profile picture, go to <a href="https://gravatar.com" target="_blank">gravatar.com</a>',
  // register/login/join/profile/tribe:
  'field.login_password': 'Password',
  'error.login_password': 'Wrong password',
  'field.username': 'Your name',
  'error.username': 'Invalid name',
  'field.email': 'Email address',
  'error.email': 'Unknown email address',
  'error.email_empty': 'An email address is required',
  'error.email_invalid': 'Invalid email address',
  'error.email_invalid_suggestion': 'Invalid address. Did you mean {suggestion}?',
  'error.email_exists': 'This email address is already registered',
  'field.password': 'Choose a password',
  'error.password': 'Invalid password',
  'field.password2': 'Password (confirmation)',
  'error.password2': 'Passwords do not match',
  'field.lang': 'Language',
  'error.lang': 'Invalid language',
  'field.birthdate': 'Birthdate',
  'field.phone': 'Phone number',
  'field.new_password': 'Password (leave blank for no change)',
  'error.new_password': 'Invalid password',
  'field.tribe_name': 'Tribe name',
  'error.tribe_name': 'Invalid tribe name',
  'field.city': 'City',
  'error.city': 'Please choose a city in the dropdown suggestions list',
  'field.currency': 'Currency',
  'error.currency': 'Please choose a currency',
  'field.tribe_type': 'Type',
  'error.tribe_type': 'Please choose a tribe type',
  'error.captcha': 'Invalid captcha',
  // common for entities:
  'field.name': 'Name',
  'error.name': 'Invalid name',
  'field.title': 'Title',
  'error.title': 'Invalid title',
  'field.description': 'Description (optional)',
  'error.other': 'Request error: please try again later',
  // bill:
  'field.payer': 'Who paid?',
  'error.payer': 'Please indicate who paid this',
  'field.paid': 'When was it?',
  'error.paid': 'Invalid date',
  'field.amount': 'Total amount',
  'error.amount': 'Invalid amount',
  'field.method': 'Sharing method',
  'method.shares': 'Shares',
  'method.amounts': 'Amounts',
  'error.method': 'Invalid method',
  'error.amount_mismatch': 'The bill amount must match the sum of the shares',
  'error.no_parts': 'You must distribute at least one share',
  // poll:
  'field.option': 'Option',
  'field.multiple': 'Allow multiple choices',
  'error.no_options': 'You must give at lease two options',
  // event:
  'field.start': 'Start date',
  'field.time.start': 'Start time (optional)',
  'error.start': 'Invalid date',
  'field.end': 'End date (optional)',
  'field.time.end': 'End time (optional)',
  'field.location': 'Location (optional)',
  'field.url': 'Link (optional)',
  // task:
  'field.wait': 'Waiting period (days)',
  'error.wait': 'Invalid period',
  'field.notice': 'Warning delay (days)',
  'error.notice': 'Invalid delay',
  // submit buttons:
  'submit.register': 'Register & create this tribe',
  'submit.join': 'Register & join this tribe',
  'submit.login': 'Login',
  'submit.password': 'Send',
  'submit.reset': 'Set my password',
  'submit.profile': 'Save profile',
  'submit.invite': 'Send invite',
  'submit.tribe.create': 'Create tribe',
  'submit.tribe.update': 'Update tribe',
  'submit.bill.create': 'Add bill',
  'submit.bill.update': 'Update bill',
  'submit.poll.create': 'Create poll',
  'submit.poll.update': 'Update poll',
  'submit.event.create': 'Add event',
  'submit.event.update': 'Update event',
  'submit.task.create': 'Add task',
  'submit.task.update': 'Update task',

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
  'entry.task.new': '{author, select, _you_ {You} other {{author}}} added a task named "{name}"',
  'entry.task.edit': '{author, select, _you_ {You} other {{author}}} modified the "{name}" task',
  'entry.task.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" task',
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

  // Tasks
  task_counter: '{user} {count, plural, =0 {never did it} one {did it once} other {did it # times}}',
  last_done: 'Last done {date}',
  never_done: 'Never done',
}
