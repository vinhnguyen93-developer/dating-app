import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const Tag = ({tagName, active, solid = false}) => {
  if (solid) {
    return (
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={
          active
            ? ['#ff948f', '#fe3a85']
            : ['rgba(232, 230, 230, .30)', 'rgba(232, 230, 230, .30)']
        }
        style={styles.containerSolid}>
        <Text
          style={[
            styles.tagTextSolid,
            active ? styles.tagTextSolidActive : '',
          ]}>
          {tagName}
        </Text>
      </LinearGradient>
    );
  } else {
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
  }
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

  // Solid
  containerSolid: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 18,
    alignSelf: 'flex-start',
  },
  tagTextSolid: {
    fontSize: 14,
    color: 'white',
  },
  tagTextSolidActive: {
    fontWeight: '600',
  },
});
