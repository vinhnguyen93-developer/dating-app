import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ButtonOutline = ({title, active = true}) => {
  return (
    <View
      style={[
        styles.buttonContainer,
        active ? styles.buttonActive : styles.buttonNonActive,
      ]}>
      <Text
        style={[
          styles.text,
          active ? styles.textActive : styles.textNonActive,
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default ButtonOutline;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 12,
    borderRadius: 26,
    width: '100%',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonActive: {
    borderColor: '#FE3A85',
  },
  buttonNonActive: {
    borderColor: '#ADADAD',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textActive: {
    color: '#FE3A85',
  },
  textNonActive: {
    color: '#8F8F8F',
  },
});
