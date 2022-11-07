import React from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

import {selectorProfile} from '../../redux/reducers/auth';

const ProfileScreen = () => {
  const profile = useSelector(selectorProfile);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.wrapImage}>
          <Image
            style={styles.image}
            source={{
              uri: profile.photoUrl[0],
            }}
          />
        </View>

        <View style={styles.wrapName}>
          <Text style={[styles.text, styles.textName]}>
            {profile?.firstName}
          </Text>
          <Text style={styles.text}>{profile?.ages}</Text>
        </View>

        <View style={styles.wrapEditRow}>
          <View style={styles.containerEdit}>
            <Pressable style={styles.buttonEdit}>
              <FontAwesome5Icon name="pen" size={18} color="#505965" />
            </Pressable>
            <Text style={styles.textEdit}>EDIT PROFILE</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    width: '100%',
  },
  wrapImage: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  image: {
    width: 146,
    height: 146,
    borderRadius: 100,
  },
  wrapName: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#21262e',
  },
  textName: {
    marginRight: 8,
  },
  wrapEditRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  containerEdit: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonEdit: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 28,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  textEdit: {
    color: '#505965',
    fontSize: 12,
  },
});
