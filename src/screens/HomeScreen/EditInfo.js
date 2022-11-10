import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

const EditInfoScreen = ({route, navigation}) => {
  const [active, setActive] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.wrapButtonTop}>
        <Pressable
          onPress={() => setActive(true)}
          style={[styles.wrapTextButton, styles.textButtonLeft]}>
          <Text
            style={[styles.textButton, active === true && styles.buttonActive]}>
            Edit
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActive(false)}
          style={styles.wrapTextButton}>
          <Text
            style={[
              styles.textButton,
              active === false && styles.buttonActive,
            ]}>
            Preview
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    backgroundColor: '#f0f2f4',
  },
  wrapButtonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapTextButton: {
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  textButton: {
    paddingVertical: 12,
    fontWeight: '500',
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  textButtonLeft: {
    borderRightWidth: 1,
    borderRightColor: '#d4d8de',
    paddingHorizontal: 14,
  },
  buttonActive: {
    color: '#D6002F',
  },
});
