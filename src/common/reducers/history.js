import {
  GET_HISTORY_REQUEST,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_FAILURE,
  NEW_BILL,
  UPDATE_BILL,
  DELETE_BILL,
  NEW_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  NEW_POLL,
  UPDATE_POLL,
  DELETE_POLL,
  PUT_POLL_SUCCESS,
  NEW_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  pages: 0,
  paging: null,
}

const createEntry = (action) => {
  const types = action.type.toLowerCase().split('_')
  return {
    type: types[1],
    action: types[0],
    added: Date.now(),
    comments: [],
    data: action.data,
    id: action.data.activity_id,
    item_id: action.data.id,
    user_id: action.author,
  }
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.page ? [...state.items, ...action.data.items] : action.data.items,
        pages: action.page + 1,
        paging: action.data.paging || state.paging,
      }
    case GET_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    case NEW_BILL:
    case UPDATE_BILL:
    case DELETE_BILL:
    case NEW_EVENT:
    case UPDATE_EVENT:
    case DELETE_EVENT:
    case NEW_POLL:
    case UPDATE_POLL:
    case DELETE_POLL:
    case NEW_TASK:
    case UPDATE_TASK:
    case DELETE_TASK:
    case PUT_POLL_SUCCESS:
      return {
        ...state,
        items: [createEntry(action), ...state.items],
      }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
