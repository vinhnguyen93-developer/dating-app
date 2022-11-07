import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';

const MessageHeader = ({userMatched, profile, navigation}) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('User view', {
          userMatched,
          profile,
        })
      }
      style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: userMatched.photoUrl[0],
        }}
      />
      <Text style={styles.text}>{userMatched.firstName}</Text>
    </Pressable>
  );
};

export default MessageHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 34,
    height: 34,
    borderRadius: 50,
  },
  text: {
    marginHorizontal: 12,
    fontSize: 16,
    color: '#21262e',
  },
});
