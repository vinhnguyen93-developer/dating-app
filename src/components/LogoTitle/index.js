import React from 'react';
import {Image, StyleSheet} from 'react-native';

const LogoTitle = () => {
  return (
    <Image
      style={styles.image}
      source={require('../../assets/images/logo.png')}
    />
  );
};

export default LogoTitle;

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 40,
  },
});
