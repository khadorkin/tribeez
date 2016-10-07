import {SubmissionError} from 'redux-form'

import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'

import saveLog from './saveLog'
import failure from './failure'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const poll = {
      name: values.name,
      description: values.description,
      multiple: values.multiple,
      options: values.options.filter((option) => option), // remove empty options
      added: values.added || timestamp,
      author: values.author,
    }
    if (poll.options.length < 2) {
      reject(new SubmissionError({_error: 'no_options'}))
      return
    }

    const tid = auth.currentUser.tid
    let id = values.id
    let action
    if (id) {
      action = 'update'
    } else {
      action = 'new'
      id = db.ref('tribes/' + tid + '/polls').push().key
    }

    db.ref('tribes/' + tid + '/polls/' + id).transaction((currentPoll) => {
      // do not keep existing answers since the options might have changed
      if (currentPoll) {
        poll.log = currentPoll.log
      }
      return poll
    })
    .then(() => {
      poll.id = id
      return saveLog('poll', action, poll)
    })
    .then(() => {
      return db.ref().update({
        ['notifications/poll/' + id]: tid,
        ['reminders/poll/' + id]: tid, // this is not doing anything when updating the poll
      })
    })
    .then(() => {
      resolve()
      router.resetTo(routes.POLLS, dispatch)
    })
    .catch((error) => {
      dispatch(failure(error, 'submitPoll'))
      reject(new SubmissionError({_error: 'request'}))
    })
  })
}
