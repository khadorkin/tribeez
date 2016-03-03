import {GET_MEMBER_SUCCESS, UPDATE_INVITE_DATA, INVITE_REQUEST, INVITE_SUCCESS, INVITE_FAILURE} from '../constants/actions'

import lang from '../utils/lang'

const initialState = {
  loading: false,
  error: null,
  email: '',
  lang: lang.getDefault(),
  snack: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        lang: action.user.lang,
      })
    case UPDATE_INVITE_DATA:
      return Object.assign({}, state, action.data)
    case INVITE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case INVITE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        snack: true,
        email: '',
      })
    case INVITE_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        snack: true,
        error: action.error,
      })
    default:
      return state
  }
}
