import { UPDATE_LANG } from '../actions'

export default (lang) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_LANG,
      lang,
    })
  }
}
