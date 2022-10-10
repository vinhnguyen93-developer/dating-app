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
    default:
      return state;
  }
};

export const selectorProfile = state => state.auth.profile;

export default authReducer;
