import { GET_INVITES_REQUEST, GET_INVITES_SUCCESS, GET_INVITES_FAILURE } from '../actions'

const initialState = {
  loading: false,
  list: [],
  error: null,
}

export default (state = initialState, action = null) => {
  let boxComments
  switch (action.type) {
    case GET_INVITES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        list: [],
        error: null,
      })
    case GET_INVITES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        list: action.list,
      })
    case GET_INVITES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    default:
      return state
  }
}
