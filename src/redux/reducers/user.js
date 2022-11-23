import * as actionTypes from '../types';

const initState = {
  users: [],
  userPasses: [],
  userSwipes: [],
  userLikeMe: [],
  loading: false,
  message: '',
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_USER_REQUEST_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        loading: false,
      };
    case actionTypes.GET_USER_REQUEST_FAILED:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case actionTypes.GET_USER_PASSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_USER_PASSES_REQUEST_SUCCESS:
      return {
        ...state,
        userPasses: action.payload.data,
        loading: false,
      };
    case actionTypes.GET_USER_PASSES_REQUEST_FAILED:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case actionTypes.GET_USER_SWIPED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_USER_SWIPED_REQUEST_SUCCESS:
      return {
        ...state,
        userSwipes: action.payload.data,
        loading: false,
      };
    case actionTypes.GET_USER_SWIPED_REQUEST_FAILED:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case actionTypes.SWIPED_NOPE_USER:
      return {
        ...state,
      };
    case actionTypes.SWIPED_NOPE_USER_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.SWIPED_NOPE_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.SWIPED_LIKE_USER:
      return {
        ...state,
      };
    case actionTypes.SWIPED_LIKE_USER_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.SWIPED_LIKE_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.GET_USER_LIKE_ME:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_USER_LIKE_ME_SUCCESS:
      return {
        ...state,
        userLikeMe: [...state.userLikeMe, action.payload.data],
        loading: false,
      };
    case actionTypes.GET_USER_LIKE_ME_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.UPDATE_USER_LIKE_ME:
      return {
        ...state,
        userLikeMe: action.payload.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export const selectorUser = state => state.user;
export const selectorLoading = state => state.user.loading;

export default userReducer;
