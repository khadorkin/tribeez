import {
  PUT_PROFILE_REQUEST,
  PUT_PROFILE_SUCCESS,
  PUT_PROFILE_FAILURE,
  UPDATE_PROFILE_DATA,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  snack: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case PUT_PROFILE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        snack: false,
      })
    case PUT_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        snack: true,
      })
    case PUT_PROFILE_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        snack: false,
      })
    case UPDATE_PROFILE_DATA:
      if (action.data.snack !== undefined) {
        return Object.assign({}, state, {
          snack: action.data.snack,
        })
      }
      return state
    default:
      return state
  }
}
