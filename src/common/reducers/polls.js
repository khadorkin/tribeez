import {
  GET_POLL_REQUEST,
  GET_POLL_SUCCESS,
  GET_POLL_FAILURE,
  POST_VOTE_SUCCESS,
  SWITCH_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  pages: 0,
  paging: null,
  current: null, // current poll being viewed or edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_POLL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_POLL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        current: action.data,
      }
    case GET_POLL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    // vote:
    case POST_VOTE_SUCCESS: {
      const items = state.items.map((item) => {
        if (item.id === action.id) {
          const answers = {...item.answers}
          answers[action.uid] = action.choices
          return {...item, answers}
        }
        return item
      })
      return {
        ...state,
        items,
      }
    }

    case SWITCH_SUCCESS:
    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
