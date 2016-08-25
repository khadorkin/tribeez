import {db} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  MEMBER_UPDATED,
} from '../constants/actions'

import failure from './failure'

let ref

const on = (uid) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })

    let gotOnce = false

    ref = db.ref('users/' + uid)
    ref.on('value', (snapshot) => {
      dispatch({
        type: MEMBER_UPDATED,
        user: snapshot.val(),
        uid,
      })
      if (!gotOnce) {
        dispatch({
          type: SUCCESS,
        })
        gotOnce = true
      }
    }, (error) => {
      dispatch(failure(error, 'listenMember'))
    })
  }
}

const off = () => {
  return () => {
    ref.off()
  }
}

export default {on, off}
