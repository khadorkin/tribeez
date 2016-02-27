import { UPDATE_LANG } from '../constants/actions'

export default (lang) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_LANG,
      lang,
    })
  }
}
