import firestore from '@react-native-firebase/firestore';

import * as actionTypes from '../types';

export const getTags = () => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_TAG_REQUEST});

    await firestore()
      .collection('tags')
      .onSnapshot(QuerySnapshot => {
        const tags = QuerySnapshot.docs.map(doc => doc.data());

        dispatch({
          type: actionTypes.GET_TAG_REQUEST_SUCCESS,
          payload: {
            data: tags,
          },
        });
      });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TAG_REQUEST_FAILED,
      payload: {
        message: error,
      },
    });
  }
};
