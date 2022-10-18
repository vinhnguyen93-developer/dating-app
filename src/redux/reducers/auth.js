import * as actionTypes from '../types';

const initialState = {
  profile: {},
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload.data,
        },
      };
    case actionTypes.ADD_USER_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ADD_USER_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ADD_USER_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const selectorProfile = state => state.auth.profile;
export const selectorLoading = state => state.auth.loading;

export default authReducer;
