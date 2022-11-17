import firestore from '@react-native-firebase/firestore';

export const updateInterestTag = (userId, tags) => {
  firestore()
    .collection('users')
    .doc(userId)
    .update({
      tags: tags,
    })
    .then(() => {
      console.log('update success');
    });
};

export const updateLocation = (userId, city) => {
  firestore()
    .collection('users')
    .doc(userId)
    .update({
      city: city,
    })
    .then(() => {
      console.log('update success');
    });
};

export const updateGender = (userId, gender) => {
  firestore()
    .collection('users')
    .doc(userId)
    .update({
      gender: gender,
    })
    .then(() => {
      console.log('update success');
    });
};

export const updateGenderExpect = (userId, gender) => {
  firestore()
    .collection('users')
    .doc(userId)
    .update({
      gender_expect: gender,
    })
    .then(() => {
      console.log('update success');
    });
};
