import {db, auth, timestamp} from '../firebase'

export default (type, action, item) => {
  const entries = 'tribes/' + auth.currentUser.tid + '/history'
  const entryKey = db.ref(entries).push().key
  const logs = 'tribes/' + auth.currentUser.tid + '/' + type + 's/' + item.id + '/log'
  const logKey = db.ref(logs).push().key
  const notifications = 'notifications'
  const notificationKey = db.ref(notifications).push().key

  // data fan-out:
  return db.ref().update({
    [entries + '/' + entryKey]: {
      type,
      action,
      time: timestamp,
      author: auth.currentUser.uid,
      item,
    },
    [logs + '/' + logKey]: {
      action,
      time: timestamp,
      author: auth.currentUser.uid,
      item,
    },
    [notifications + '/' + notificationKey]: { //TODO: avoid flooding the users
      type,
      action,
      author: auth.currentUser.uid,
      item,
    },
  })
}
