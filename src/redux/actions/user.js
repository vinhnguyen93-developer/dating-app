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

export const swipeLeft =
  (partnerProfile, userId) => async (dispatch, getState) => {
    try {
      dispatch({type: actionTypes.SWIPED_NOPE_USER});

      firestore()
        .collection('users')
        .doc(userId)
        .collection('passes')
        .doc(partnerProfile.uid)
        .set(partnerProfile)
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
  (partnerProfile, profile, navigation) => async (dispatch, getState) => {
    try {
      dispatch({type: actionTypes.SWIPED_LIKE_USER});

      firestore()
        .collection('users')
        .doc(partnerProfile.uid)
        .collection('swipes')
        .doc(profile.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            firestore()
              .collection('users')
              .doc(profile.uid)
              .collection('swipes')
              .doc(partnerProfile.uid)
              .set(partnerProfile)
              .then(() => console.log('user swiped'));

            // Create a matches
            firestore()
              .collection('matches')
              .doc(generateId(profile.uid, partnerProfile.uid))
              .set({
                users: {
                  [profile.uid]: profile,
                  [partnerProfile.uid]: partnerProfile,
                },
                usersMatched: [profile.uid, partnerProfile.uid],
                timestamp: firestore.FieldValue.serverTimestamp(),
                isNewMatch: true,
              })
              .then(() => {
                navigation.navigate('Matching', {
                  profile: partnerProfile,
                });
              });
          } else {
            firestore()
              .collection('users')
              .doc(profile.uid)
              .collection('swipes')
              .doc(partnerProfile.uid)
              .set(partnerProfile)
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

export const getUserLikeMe = (users, profileId) => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_USER_LIKE_ME});

    users.map(user => {
      firestore()
        .collection('users')
        .doc(user.uid)
        .collection('swipes')
        .doc(profileId)
        .onSnapshot(snapshots => {
          if (snapshots.exists === true) {
            dispatch({
              type: actionTypes.GET_USER_LIKE_ME_SUCCESS,
              payload: {
                data: user,
              },
            });
          }
        });
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER_LIKE_ME_FAILED,
      payload: {
        message: error,
      },
    });
  }
};
