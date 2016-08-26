// base messages: this file is the fallback for other langs

export default {
  // web-only
  android_banner: 'Install the Tribeez app for a better experience!',

  // titles
  welcome: 'Welcome',
  register: 'Register',
  join: 'Join',
  login: 'Login',
  password: 'Lost password',
  reset: 'Password update',
  activity: 'Tribeez',
  profile: 'Profile',
  members: 'Members',
  members_new: 'New member',
  bills: 'Expenses',
  bills_new: 'New expense',
  bills_edit: 'Edit expense',
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
  tribe_new: 'New tribe',
  tribe_edit: 'Tribe',

  // slides
  start: 'Tribeez',
  end: 'You\'re all set!',
  'start.description': 'The best way to sort your group life',
  'bills.description': 'Easily split expenses between concerned members',
  'events.description': 'Create and get notified of events to enjoy moments together',
  'polls.description': 'Ask for opinions and quickly get answers',
  'tasks.description': 'Assign them to get things done',
  'notes.description': 'Share shopping lists and never forget that Wifi password again',
  'end.description': 'Choose an option below to get started',
  'slides.login': 'LOGIN',
  'slides.register': 'CREATE ACCOUNT',

  // subtitles
  messenger_bot: 'Facebook Messenger Bot',
  not_found: 'Page not found',
  title: 'Title',

  // tabs
  'tab.activity': 'What\'s up',
  'tab.history': 'History',
  'tab.registered': 'Registered',
  'tab.invited': 'Invited',
  'tab.upcoming': 'Upcoming',
  'tab.past': 'Past',
  'tab.bills': 'List',
  'tab.balances': 'Balances',

  // empty
  'empty.bills': 'Did you pay something for your tribe?\nRegister it here!',
  'empty.events': 'Do you want to let your tribe know about an upcoming event?\nThis is your calendar!',
  'empty.tasks': 'Do you want to assign a recurring task?\nCreate it now!',
  'empty.notes': 'Do you want to make a list or remember something?\nWrite a note!',
  'empty.polls': 'Do you want to ask something to your tribe?\nAsk them here!',
  'empty.invites': 'Do you want to add people to your tribe?\nInvite them now!',

  // dates
  date: 'On {date, date, event}',
  datetime: 'On {date, date, event} at {date, time, short}',
  interval: 'From {start, date, event} to {end, date, event}',
  intervaltime: 'From {start, date, event} at {start, time, short} to {end, date, event} at {end, time, short}',

  // actions
  delete: 'Delete',
  send: 'Send',
  cancel: 'Cancel',
  close: 'Close',
  delete_dialog: 'Do you really want to delete this {type}?',
  vote_again: 'Change your vote',
  submit_vote: 'Vote',
  return_home: 'Return to Activity',
  retry: 'Retry',

  // Dialogs
  dialog_delete: 'Are you sure you want to delete this?',
  dialog_reinvite: 'Do you want to send an invite again to this address?',
  dialog_update_title: 'Your app is outdated',
  dialog_update_text: 'Please update it to continue using it',
  dialog_reset_title: 'A reset link has been sent to your email address',
  dialog_reset_text: 'Click on that link to reset your password',

  // snack messages
  'snack.password_changed': 'Password changed',
  'snack.profile_updated': 'Profile updated',
  'snack.tribe_created': 'Tribe created',
  'snack.tribe_updated': 'Tribe updated',
  'snack.invite_sent': 'Invite sent',
  'snack.invite_resent': 'Invite sent again',
  'snack.switched': 'Tribe changed',
  'snack.joined': 'Welcome to the "{name}" tribe',
  'snack.new_member': '{author, select, _you_ {You} other {{author}}} joined the tribe',
  'snack.new_bill': '{author, select, _you_ {Expense created} other {{author} created the "{name}" expense}}',
  'snack.update_bill': '{author, select, _you_ {Expense updated} other {{author} updated the "{name}" expense}}',
  'snack.delete_bill': '{author, select, _you_ {Expense deleted} other {{author} deleted the "{name}" expense}}',
  'snack.comment_bill': '{author, select, _you_ {Comment sent} other {{author} commented the "{name}" expense}}',
  'snack.note_created': 'Note created',
  'snack.note_updated': 'Note saved',
  'snack.notes_reordered': 'Notes reordered',
  'snack.note_deleted': 'Note deleted',
  'snack.new_event': '{author, select, _you_ {Event created} other {{author} created the "{name}" event}}',
  'snack.update_event': '{author, select, _you_ {Event updated} other {{author} updated the "{name}" event}}',
  'snack.delete_event': '{author, select, _you_ {Event deleted} other {{author} deleted the "{name}" event}}',
  'snack.comment_event': '{author, select, _you_ {Comment sent} other {{author} commented the "{name}" event}}',
  'snack.new_poll': '{author, select, _you_ {Poll created} other {{author} created the "{name}" poll}}',
  'snack.update_poll': '{author, select, _you_ {Poll updated} other {{author} updated the "{name}" poll}}',
  'snack.delete_poll': '{author, select, _you_ {Poll deleted} other {{author} deleted the "{name}" poll}}',
  'snack.comment_poll': '{author, select, _you_ {Comment sent} other {{author} commented the "{name}" poll}}',
  'snack.poll_updated': 'Poll updated',
  'snack.new_task': '{author, select, _you_ {Task created} other {{author} created the "{name}" task}}',
  'snack.update_task': '{author, select, _you_ {Task updated} other {{author} updated the "{name}" task}}',
  'snack.delete_task': '{author, select, _you_ {Task deleted} other {{author} deleted the "{name}" task}}',
  'snack.comment_task': '{author, select, _you_ {Comment sent} other {{author} commented the "{name}" task}}',
  'snack.voted': 'Voted',
  'snack.task_done': 'Task marked as done',
  'snack.logout_success': 'You have been logged out',
  'snack.error': 'Error: please try again',

  // FORMS
  // subtitles:
  register_info: 'Note that you need an invite to join an existing tribe. In that case, follow the link in the invite email you received.',
  password_reset: 'Fill this form to receive a reset link via email',
  password_change: '{name}, please choose a new password',
  invited_you: '{name} invited you',
  login_to_join: 'You are now part of the "{tribe_name}" tribe, following {inviter_name}\'s invitation',
  you: 'You',
  your_tribe: 'Your tribe',
  create_account: 'Create account',
  password_lost: 'Lost your password?',
  no_account: 'No account yet?',
  register_now: 'Register now!',
  gravatar: 'To change your profile picture, go to {link}',
  poll_edit_warning: 'Warning: modifying this poll will delete its answers',
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
  'error.password_empty': 'A password is required',
  'error.password_weak': 'Password is too weak',
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
  'select.flatshare': 'Flatshare',
  'select.family': 'Family',
  'select.friends': 'Friends',
  'select.organization': 'Organization',
  'select.other': 'Other',
  'error.tribe_type': 'Please choose a tribe type',
  'error.captcha': 'Invalid captcha',
  'reauth_prompt': 'Type your current password to confirm this operation',
  // common for entities:
  'field.name': 'Name',
  'error.name': 'Invalid name',
  'field.title': 'Title',
  'error.title': 'Invalid title',
  'field.description': 'Description (optional)',
  // bill:
  'field.payer': 'Who paid?',
  'error.payer': 'Please indicate who paid this',
  'field.paid': 'When was it?',
  'error.paid': 'Invalid date',
  'field.amount': 'Total amount',
  'error.amount': 'Invalid amount',
  'field.method': 'Sharing method',
  'select.shares': 'Shares',
  'select.amounts': 'Amounts',
  'error.method': 'Invalid method',
  'error.amount_mismatch': 'The total amount must match the sum of the shares',
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
  'field.reminder': 'Reminder',
  'select.none': 'None',
  'select.2d': '2 days before',
  'select.1d': 'The day before',
  'select.2h': '2 hours before',
  'select.1h': '1 hour before',
  'error.reminder': 'Invalid reminder',
  // task:
  'field.wait': 'Waiting period (days)',
  'error.wait': 'Invalid period',
  'field.task_users': 'Concerned members:',
  'error.no_users': 'You must choose at lease one concerned member',
  // submit buttons:
  'submit.register': 'Register & create this tribe',
  'submit.join': 'Register & join this tribe',
  'submit.login': 'Login',
  'submit.password': 'Send',
  'submit.profile': 'Save profile',
  'submit.invite': 'Send invite',
  'submit.tribe.create': 'Create tribe',
  'submit.tribe.update': 'Update tribe',
  'submit.bill.create': 'Add expense',
  'submit.bill.update': 'Update expense',
  'submit.poll.create': 'Create poll',
  'submit.poll.update': 'Update poll',
  'submit.event.create': 'Add event',
  'submit.event.update': 'Update event',
  'submit.task.create': 'Add task',
  'submit.task.update': 'Update task',
  // leave hook:
  confirm_leave_form: 'The form has been modified. Do you want to leave without finishing?',
  // Comment box:
  comment: 'Your comment…',

  // Activity
  'activity.members': '{num, plural, one {New member} other {# new members}}',
  'activity.polls': '{num, plural, one {Unanswered poll} other {# unanswered polls}}',
  'activity.tasks': '{num, plural, one {Task to do} other {# tasks to do}}',
  'activity.events': '{num, plural, one {Upcoming event} other {# upcoming events}}',
  'activity.bills': '{num, plural, one {New bill} other {# new bills}}',
  'activity.notes': '{num, plural, one {Modified note} other {# modified notes}}',
  welcome_message: 'Welcome to your new tribe! This is a private space made of tools to help you sort your group life, so it\'s better if you are not alone:',
  invite_button: 'Invite people now!',

  // History
  'entry.member.new': '{author, select, _you_ {You} other {{author}}} joined the tribe!',
  'entry.member.new.infos': 'Invited by {inviter}',
  'entry.bill.new': '{author, select, _you_ {You} other {{author}}} added an expense named "{name}" ({amount, number, money})',
  'entry.bill.new.infos': 'Your share is {amount, number, money}',
  'entry.bill.new.stranger': 'You are not concerned',
  'entry.bill.update': '{author, select, _you_ {You} other {{author}}} modified the "{name}" expense ({amount, number, money})',
  'entry.bill.update.infos': 'Your share is now {amount, number, money}',
  'entry.bill.update.stranger': 'You are not concerned',
  'entry.bill.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" expense ({amount, number, money})',
  'entry.bill.delete.infos': 'Your share was {amount, number, money}',
  'entry.bill.delete.stranger': 'You were not concerned',
  'entry.bill.comment': '{author, select, _you_ {You} other {{author}}} commented the "{name}" expense:',
  'entry.poll.new': '{author, select, _you_ {You} other {{author}}} added a poll named "{name}"',
  'entry.poll.update': '{author, select, _you_ {You} other {{author}}} modified the "{name}" poll',
  'entry.poll.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" poll',
  'entry.poll.comment': '{author, select, _you_ {You} other {{author}}} commented the "{name}" poll:',
  'entry.event.new': '{author, select, _you_ {You} other {{author}}} added an event named "{name}" starting {when, date}',
  'entry.event.update': '{author, select, _you_ {You} other {{author}}} modified the "{name}" event starting {when, date}',
  'entry.event.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" event starting {when, date}',
  'entry.event.comment': '{author, select, _you_ {You} other {{author}}} commented the "{name}" event:',
  'entry.task.new': '{author, select, _you_ {You} other {{author}}} added a task named "{name}"',
  'entry.task.update': '{author, select, _you_ {You} other {{author}}} modified the "{name}" task',
  'entry.task.delete': '{author, select, _you_ {You} other {{author}}} deleted the "{name}" task',
  'entry.task.comment': '{author, select, _you_ {You} other {{author}}} commented the "{name}" task:',
  'entry.comments': '{num, plural, =0 {No comments} one {# comment} other {# comments}}',
  //telegram: 'Using Telegram?\nChat with TribeezBot!',

  // Members
  'member_since': 'Member since {when, date}',
  'invited_by': 'Invited by {user}',

  // Bills
  'bill.mypart': 'Your share is {amount, number, money}',
  'bill.nopart': 'You are not concerned',
  paid_by: 'Paid by {user}',
  paid_on: 'Paid on {when, date}',
  parts: 'Shares',

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
  last_done: 'Last done {ago}',
  never_done: 'Never done',
  mark_done: 'I just did it',
  counters: 'Counters',

  // Notes
  'placeholder.title': 'Title',
  'placeholder.content': 'Take a note…',
  'notes.by': 'By {author}',

  // Polls
  poll_answers: '{num, plural, =0 {No answers} one {1 answer} other {# answers}}',
  asked_by: '{author} asked',

  //Details
  created_by: 'Created by {author}',
  log: 'History & comments',

  // Common error handling
  'error.request': 'Request error: please try again later',
  'error.network': 'Network error: please try again when your connection is back',
  'error.not_found': 'This item does not exist anymore',
  'error.reauth': 'Wrong current password',
}
