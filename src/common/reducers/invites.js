import {
  GET_INVITES_REQUEST,
  GET_INVITES_SUCCESS,
  GET_INVITES_FAILURE,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  pages: 0,
  paging: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_INVITES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_INVITES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.page ? [...state.items, ...action.data.items] : action.data.items,
        pages: action.page + 1,
        paging: action.data.paging || state.paging,
      }
    case GET_INVITES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
