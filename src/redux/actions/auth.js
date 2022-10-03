import * as actionTypes from '../types';

export function setUserInfo(data) {
  return {
    type: actionTypes.SET_USER_INFO,
    payload: {
      data,
    },
  };
}
