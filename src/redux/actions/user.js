import firestore from '@react-native-firebase/firestore';

import * as actionTypes from '../types';

export const getUsers =
  (city, gender, userId) => async (dispatch, getState) => {
    try {
      dispatch({type: actionTypes.GET_USER_REQUEST});

      await firestore()
        .collection('users')
        .doc(userId)
        .collection('passes')
        .get()
        .then(snapshot => {
          const userPasses = snapshot.docs.map(doc => doc.data().uid);

          firestore()
            .collection('users')
            .where('uid', 'not-in', [...userPasses, ''])
            .get()
            .then(QuerySnapshot => {
              const users = QuerySnapshot.docs
                .map(doc => doc.data())
                .filter(user => user.city === city && user.gender === gender);

              dispatch({
                type: actionTypes.GET_USER_REQUEST_SUCCESS,
                payload: {
                  data: users,
                },
              });
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

export const swipeLeft = (cardIndex, userId) => async (dispatch, getState) => {
  try {
    dispatch({type: actionTypes.SWIPED_NOPE_USER});

    const {user} = getState();
    const {users} = user;

    if (!users[cardIndex]) {
      return;
    }

    const userSwiped = users[cardIndex];

    firestore()
      .collection('users')
      .doc(userId)
      .collection('passes')
      .doc(userSwiped.uid)
      .set(userSwiped)
      .then(() => console.log('user added'));
  } catch (error) {
    dispatch({
      type: actionTypes.SWIPED_NOPE_USER_FAILED,
      payload: {
        message: error,
      },
    });
  }
};

export const swipeRight = (cardIndex, userId) => async (dispatch, getState) => {
  try {
    dispatch({type: actionTypes.SWIPED_LIKE_USER});

    const {user} = getState();
    const {users} = user;

    if (!users[cardIndex]) {
      return;
    }

    const userSwiped = users[cardIndex];
    console.log(userSwiped);

    firestore()
      .collection('users')
      .doc(userId)
      .collection('passes')
      .doc(userSwiped.uid)
      .set(userSwiped)
      .then(() => console.log('user added'));
  } catch (error) {
    dispatch({
      type: actionTypes.SWIPED_LIKE_USER_FAILED,
      payload: {
        message: error,
      },
    });
  }
};
