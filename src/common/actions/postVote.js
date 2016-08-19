import {db, auth} from '../firebase'

import {
  REQUEST,
  SUCCESS,
} from '../constants/actions'

import report from './error'

export default (id, choices) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/polls/' + id).transaction((poll) => {
      if (poll) {
        if (!poll.answers) {
          poll.answers = {}
        }
        poll.answers[auth.currentUser.uid] = choices
      }
      return poll
    })
    .then(() => {
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(report(error, 'postVote'))
    })
  }
}
