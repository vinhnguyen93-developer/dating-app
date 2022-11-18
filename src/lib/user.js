import firestore from '@react-native-firebase/firestore';

export const updateInterestTag = (userId, tags, navigation) => {
  firestore()
    .collection('users')
    .doc(userId)
    .update({
      tags: tags,
    })
    .then(() => {
      navigation.goBack();
    });
};

export const updateLocation = (userId, city, navigation) => {
  firestore()
    .collection('users')
    .doc(userId)
    .update({
      city: city,
    })
    .then(() => {
      navigation.goBack();
    });
};

export const updateGender = (userId, gender, navigation) => {
  firestore()
    .collection('users')
    .doc(userId)
    .update({
      gender: gender,
    })
    .then(() => {
      navigation.goBack();
    });
};

export const updateGenderExpect = (userId, gender, navigation) => {
  firestore()
    .collection('users')
    .doc(userId)
    .update({
      gender_expect: gender,
    })
    .then(() => {
      navigation.goBack();
    });
};

export const updateProfileInfo = (userId, data, navigation) => {
  firestore()
    .collection('users')
    .doc(userId)
    .update({
      ...data,
    })
    .then(() => {
      navigation.goBack();
    });
};
