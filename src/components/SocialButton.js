import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SocialButton = ({icon, title, bottom, solid}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, {bottom: bottom}]}>
      <View style={styles.iconWrapper}>
        <FontAwesome5 name={icon} color={'white'} solid={solid} size={16} />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 25,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
