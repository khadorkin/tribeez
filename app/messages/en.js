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
  events: 'Events',
  events_new: 'New event',
  tasks: 'Tasks',
  tasks_new: 'New task',
  notes: 'Notes',
  notes_new: 'New note',
  polls: 'Polls',
  polls_new: 'New poll',
  tribe: 'Tribe',
  tribe_new: 'New tribe',

  // actions
  cancel: 'Cancel',

  // snack messages
  'snack.password_changed': 'Password changed',
  'snack.profile_updated': 'Profile updated',
  'snack.tribe_created': 'Tribe created',
  'snack.tribe_updated': 'Tribe updated',
  'snack.invite_sent': 'Invite sent',
  'snack.invite_resent': 'Invite sent again',
  'snack.bill_added': 'Bill added',

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
  'error.amount.invalid': 'Invalid amount',
  'error.amount.mismatch': 'Must match the total of the shares',
  'error.no_parts': 'Error: you must distribute at least one share',
  // common:
  'error.other': 'Request error: please try again later',
  'submit.tribe.create': 'Create tribe',
  'submit.tribe.update': 'Update tribe',

  // Members
  'add_member': 'Add a member',
  'member_since': 'Member since {date}',
  'invited_by': 'Invited by {user} on {date}',

  // Activity
  'entry.new_user': '{name} has joined the tribe!',
  'entry.new_user.item': '{name} (invited by {item}) has joined the tribe!',
  'entry.comments': '{num, plural, =0 {No comments} one {# comment} other {# comments}}', // http://formatjs.io/guides/message-syntax/#plural-format
  comment: 'Your comment...',

  // Bills
  'bill.mypart': 'My part is {amount}',
}
