import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import * as actionTypes from '../types';

export function setUserInfo(data) {
  return {
    type: actionTypes.SET_USER_INFO,
    payload: {
      data,
    },
  };
}

export const addUserProfile =
  ({images, userId}) =>
  async (dispatch, getState) => {
    dispatch({type: actionTypes.ADD_USER_PROFILE});

    const photoUrl = await Promise.all(
      images.map(async image => {
        let filename = image.substring(image.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');

        filename = name + Date.now() + '.' + extension;

        const storageRef = storage().ref(`images/${filename}`);
        const uploadTask = storageRef.putFile(image);

        await uploadTask;
        const url = storageRef.getDownloadURL();

        return url;
      }),
    );

    dispatch({
      type: actionTypes.ADD_USER_PHOTO_SUCCESS,
      payload: {
        photoUrl,
      },
    });

    const {auth} = getState();

    firestore()
      .collection('users')
      .doc(userId)
      .set({
        ...auth.profile,
        uid: userId,
        timestamp: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        dispatch({
          type: actionTypes.ADD_USER_PROFILE_SUCCESS,
        });
      });
  };
