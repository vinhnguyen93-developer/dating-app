import firestore from '@react-native-firebase/firestore';

export const updateReadMessage = (matchedId, messageId) => {
  firestore()
    .collection('matches')
    .doc(matchedId)
    .collection('messages')
    .doc(messageId)
    .update({
      'user.received': false,
    })
    .then(() => {
      console.log('update success');
    });
};

export const updateUserHaveMessage = matchedId => {
  firestore()
    .collection('matches')
    .doc(matchedId)
    .update({
      isNewMatch: false,
    })
    .then(() => {
      console.log('update success');
    });
};
