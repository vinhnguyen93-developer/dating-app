import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ButtonOutline = ({title, active = true, type = 'lager'}) => {
  return (
    <View
      style={[
        styles.buttonContainer,
        active ? styles.buttonActive : styles.buttonNonActive,
        type === 'sm' ? styles.sm : styles.lg,
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
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sm: {
    paddingVertical: 10,
    paddingHorizontal: 95,
  },
  lg: {
    width: '100%',
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
