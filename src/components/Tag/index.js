import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';

const Tag = ({tagName, active}) => {
  return (
    <View
      style={[
        styles.container,
        active ? styles.tagActive : styles.tagNonActive,
      ]}>
      <Text
        style={[
          styles.tagText,
          active ? styles.tagTextActive : styles.tagTextNonActive,
        ]}>
        {tagName}
      </Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  tagActive: {
    borderColor: '#fe3a85',
  },
  tagNonActive: {
    borderColor: '#ADADAD',
  },
  tagText: {
    fontWeight: '600',
    fontSize: 16,
  },
  tagTextActive: {
    color: '#fe3a85',
  },
  tagTextNonActive: {
    color: '#ADADAD',
  },
});
