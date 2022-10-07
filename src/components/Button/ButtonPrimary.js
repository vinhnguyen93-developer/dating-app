import React from 'react';
import {StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ButtonPrimary = ({title, active = true}) => {
  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      colors={active ? ['#ff948f', '#fe3a85'] : ['#DBDBDB', '#DBDBDB']}
      style={styles.buttonContainer}>
      <Text
        style={[
          styles.text,
          active ? styles.textActive : styles.textNonActive,
        ]}>
        {title}
      </Text>
    </LinearGradient>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 16,
    borderRadius: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  textActive: {
    color: '#ffffff',
  },
  textNonActive: {
    color: '#8F8F8F',
  },
});
