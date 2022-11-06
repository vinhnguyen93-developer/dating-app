import * as actionTypes from '../types';

const initState = {
  messages: [],
  loading: false,
  message: '',
};

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MESSAGE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SEND_MESSAGE_FAILED:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case actionTypes.GET_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_MESSAGE_REQUEST_SUCCESS:
      return {
        ...state,
        messages: action.payload.data,
        loading: false,
      };
    case actionTypes.GET_MESSAGE_REQUEST_FAILED:
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

export const selectorMessage = state => state.message.messages;
export const selectorError = state => state.message.message;

export default messageReducer;
