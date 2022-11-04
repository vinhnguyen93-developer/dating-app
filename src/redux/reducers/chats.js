import * as actionTypes from '../types';

const initState = {
  userMatches: [],
  chats: [],
  loading: false,
  message: '',
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_MATCHES:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_USER_MATCHES_SUCCESS:
      return {
        ...state,
        userMatches: action.payload.data,
        loading: false,
      };
    case actionTypes.GET_USER_MATCHES_FAILED:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export const selectorUserMatches = state => state.chats.userMatches;
export const selectorError = state => state.chats.message;

export default chatReducer;
