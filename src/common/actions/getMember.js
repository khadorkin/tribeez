import {db, auth} from '../firebase'

import {
  SYNC_TRIBE_REQUEST,
  SYNC_TRIBE_FAILURE,
  USER_UPDATED,
  TRIBE_UPDATED,
  MEMBER_ADDED,
  MEMBER_UPDATED,
} from '../constants/actions'

export default (uid) => {
  return (dispatch) => {
    dispatch({
      type: SYNC_TRIBE_REQUEST,
    })

    const private_user_path = 'users_private/' + uid

    db.ref(private_user_path).on('value', (snapshot) => {
      const user = snapshot.val()

      dispatch({
        type: USER_UPDATED,
        user,
      })
    }, (error) => {
      dispatch({
        type: SYNC_TRIBE_FAILURE,
        error: error.code,
        path: private_user_path,
      })
    })

    const user_path = 'users/' + uid
    db.ref(user_path).on('value', (snapshot) => {
      const user = snapshot.val()

      auth.currentUser.tid = user.current_tribe

      dispatch({
        type: USER_UPDATED,
        user,
      })

      const tribe_path = 'tribes/' + user.current_tribe + '/infos'
      db.ref(tribe_path).on('value', (sub_snapshot) => {
        const tribe = sub_snapshot.val()
        tribe.key = user.current_tribe

        dispatch({
          type: TRIBE_UPDATED,
          tribe,
        })
      }, (error) => {
        dispatch({
          type: SYNC_TRIBE_FAILURE,
          error: error.code,
          path: tribe_path,
        })
      })

      const members_path = 'tribes/' + user.current_tribe + '/members'
      db.ref(members_path).on('child_added', (sub_snapshot) => {
        const member = sub_snapshot.val()
        member.uid = sub_snapshot.key
        dispatch({
          type: MEMBER_ADDED,
          member,
        })
      }, (error) => {
        dispatch({
          type: SYNC_TRIBE_FAILURE,
          error: error.code,
          path: members_path,
        })
      })

      db.ref(members_path).on('child_changed', (sub_snapshot) => {
        const member = sub_snapshot.val()
        member.uid = sub_snapshot.key
        dispatch({
          type: MEMBER_UPDATED,
          member,
        })
      }, (error) => {
        dispatch({
          type: SYNC_TRIBE_FAILURE,
          error: error.code,
          path: members_path,
        })
      })
    }, (error) => {
      dispatch({
        type: SYNC_TRIBE_FAILURE,
        error: error.code,
        path: user_path,
      })
    })
  }
}
