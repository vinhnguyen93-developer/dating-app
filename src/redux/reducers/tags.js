import * as actionTypes from '../types';

const initState = {
  tags: [],
  loading: false,
  message: '',
};

const tagReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_TAG_REQUEST_SUCCESS:
      return {
        ...state,
        tags: action.payload.data,
        loading: false,
      };
    case actionTypes.GET_TAG_REQUEST_FAILED:
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

export const selectorTags = state => state.tagReducer.tags;
export const selectorError = state => state.tagReducer.message;

export default tagReducer;
