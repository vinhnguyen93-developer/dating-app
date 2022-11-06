import firestore from '@react-native-firebase/firestore';

import * as actionTypes from '../types';

export const sendMessage = (matchedId, message) => async dispatch => {
  try {
    dispatch({type: actionTypes.SEND_MESSAGE});

    await firestore()
      .collection('matches')
      .doc(matchedId)
      .collection('messages')
      .add(message)
      .then(() => {
        dispatch({
          type: actionTypes.SEND_MESSAGE_SUCCESS,
        });
      });
  } catch (error) {
    dispatch({
      type: actionTypes.SEND_MESSAGE_FAILED,
      payload: {
        message: error,
      },
    });
  }
};

export const getMessage = matchedId => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_MESSAGE_REQUEST});

    await firestore()
      .collection('matches')
      .doc(matchedId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }));

        dispatch({
          type: actionTypes.GET_MESSAGE_REQUEST_SUCCESS,
          payload: {
            data: messages,
          },
        });
      });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_MESSAGE_REQUEST_FAILED,
      payload: {
        message: error,
      },
    });
  }
};
