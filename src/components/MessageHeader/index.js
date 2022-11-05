import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const MessageHeader = ({image, name}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <Text style={styles.text}>{name}</Text>
    </View>
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
