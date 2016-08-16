import {db} from '../firebase'

import {CONFIG} from '../constants/actions'

import platform from '../platform'

export default () => {
  return (dispatch) => {
    db.ref('config/' + platform).once('value')
    .then((snapshot) => {
      dispatch({
        type: CONFIG,
        config: snapshot.val(),
      })
    })
    .catch(() => {}) // ignore fails
  }
}
