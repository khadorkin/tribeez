import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
} from '../constants/actions'

import {firebaseError} from './error'

export default (id, choices) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/polls/' + id).transaction((poll) => {
      if (!poll.answers) {
        poll.answers = {}
      }
      poll.answers[auth.currentUser.uid] = choices
      return poll
    })
    .then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(firebaseError(error, 'postVote'))
    })
  }
}
