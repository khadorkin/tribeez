import { GET_INVITES_REQUEST, GET_INVITES_SUCCESS, GET_INVITES_FAILURE } from '../actions'

const initialState = {
  loading: false,
  list: [],
  error: false,
}

export default (state = initialState, action = null) => {
  let boxComments
  switch (action.type) {
    case GET_INVITES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        list: [],
        error: false,
      })
    case GET_INVITES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        list: action.list,
      })
    case GET_INVITES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: true,
      })
    default:
      return state
  }
}
