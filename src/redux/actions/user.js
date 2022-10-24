import firestore from '@react-native-firebase/firestore';

import * as actionTypes from '../types';

export const getUsers = (city, gender) => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_USER_REQUEST});

    await firestore()
      .collection('users')
      .where('gender_expect', '==', gender)
      .where('city', '==', city)
      .onSnapshot(QuerySnapshot => {
        const users = QuerySnapshot.docs.map(doc => doc.data());

        dispatch({
          type: actionTypes.GET_USER_REQUEST_SUCCESS,
          payload: {
            data: users,
          },
        });
      });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER_REQUEST_FAILED,
      payload: {
        message: error,
      },
    });
  }
};
