import * as actionTypes from '../types';

const initState = {
  users: [],
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
    default:
      return {
        ...state,
      };
  }
};

export const selectorUser = state => state.user.users;
export const selectorLoading = state => state.user.loading;

export default userReducer;
