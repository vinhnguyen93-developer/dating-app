import firestore from '@react-native-firebase/firestore';

import * as actionTypes from '../types';
import getUserMatchesInfo from '../../lib/getUserMatchesInfo';

export const getUserMatches = userId => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_USER_MATCHES});

    await firestore()
      .collection('matches')
      .where('usersMatched', 'array-contains', userId)
      .onSnapshot(QuerySnapshot => {
        const users = QuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const dataUsers = getUserMatchesInfo(users, userId);

        dispatch({
          type: actionTypes.GET_USER_MATCHES_SUCCESS,
          payload: {
            data: dataUsers,
          },
        });
      });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER_MATCHES_FAILED,
      payload: {
        message: error,
      },
    });
  }
};
