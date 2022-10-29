import firestore from '@react-native-firebase/firestore';

import * as actionTypes from '../types';
import generateId from '../../lib/generateId';

export const getUsers =
  (city, gender, userId) => async (dispatch, getState) => {
    try {
      dispatch({type: actionTypes.GET_USER_REQUEST});

      await dispatch(getUserPasses(userId));
      await dispatch(getUserSwiped(userId));

      const {user} = getState();
      const userPasses = user?.userPasses;
      const userSwipes = user?.userSwipes;

      firestore()
        .collection('users')
        .where('uid', 'not-in', [...userPasses, ...userSwipes, ''])
        .get()
        .then(QuerySnapshot => {
          const users = QuerySnapshot.docs
            .map(doc => doc.data())
            .filter(
              userPartner =>
                userPartner.city === city && userPartner.gender === gender,
            );

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
      .then(() => console.log('user passed'));
  } catch (error) {
    dispatch({
      type: actionTypes.SWIPED_NOPE_USER_FAILED,
      payload: {
        message: error,
      },
    });
  }
};

export const swipeRight =
  (cardIndex, profile) => async (dispatch, getState) => {
    try {
      dispatch({type: actionTypes.SWIPED_LIKE_USER});

      const {user} = getState();
      const {users} = user;

      if (!users[cardIndex]) {
        return;
      }

      const userSwiped = users[cardIndex];

      firestore()
        .collection('users')
        .doc(userSwiped.uid)
        .collection('swipes')
        .doc(profile.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            firestore()
              .collection('users')
              .doc(profile.uid)
              .collection('swipes')
              .doc(userSwiped.uid)
              .set(userSwiped)
              .then(() => console.log('user swiped'));

            // Create a matches
            firestore()
              .collection('matches')
              .doc(generateId(profile.uid, userSwiped.uid))
              .set({
                users: {
                  [profile.uid]: profile,
                  [userSwiped.uid]: userSwiped,
                },
                usersMatched: [profile.uid, userSwiped.uid],
                timestamp: firestore.FieldValue.serverTimestamp(),
              });
          } else {
            firestore()
              .collection('users')
              .doc(profile.uid)
              .collection('swipes')
              .doc(userSwiped.uid)
              .set(userSwiped)
              .then(() => console.log('user swiped'));
          }
        });
    } catch (error) {
      dispatch({
        type: actionTypes.SWIPED_LIKE_USER_FAILED,
        payload: {
          message: error,
        },
      });
    }
  };

export const getUserPasses = userId => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_USER_PASSES_REQUEST});

    await firestore()
      .collection('users')
      .doc(userId)
      .collection('passes')
      .get()
      .then(snapshot => {
        const userPasses = snapshot.docs.map(doc => doc.data().uid);

        dispatch({
          type: actionTypes.GET_USER_PASSES_REQUEST_SUCCESS,
          payload: {
            data: userPasses,
          },
        });
      });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER_PASSES_REQUEST_FAILED,
      payload: {
        message: error,
      },
    });
  }
};

export const getUserSwiped = userId => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_USER_SWIPED_REQUEST});

    await firestore()
      .collection('users')
      .doc(userId)
      .collection('swipes')
      .get()
      .then(snapshot => {
        const userSwiped = snapshot.docs.map(doc => doc.data().uid);

        dispatch({
          type: actionTypes.GET_USER_SWIPED_REQUEST_SUCCESS,
          payload: {
            data: userSwiped,
          },
        });
      });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER_SWIPED_REQUEST_FAILED,
      payload: {
        message: error,
      },
    });
  }
};
