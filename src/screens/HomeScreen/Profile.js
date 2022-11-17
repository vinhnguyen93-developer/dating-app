import React from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import {selectorProfile} from '../../redux/reducers/auth';
import {useAuthContext} from '../../context/AuthContext';

const ProfileScreen = ({navigation}) => {
  const profile = useSelector(selectorProfile);
  const {logout} = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.contentTopContainer}>
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
            <Pressable
              onPress={() => navigation.navigate('Edit Info')}
              style={[styles.buttonEdit, styles.boxShadow]}>
              <FontAwesome5Icon name="pen" size={18} color="#505965" />
            </Pressable>
            <Text style={styles.textEdit}>EDIT PROFILE</Text>
          </View>

          <View style={styles.containerEdit}>
            <Pressable
              onPress={() =>
                navigation.navigate('Update photo', {
                  profile,
                })
              }
              style={[styles.buttonEdit, styles.boxShadow]}>
              <FontAwesome5Icon name="camera" size={18} color="#505965" />
            </Pressable>
            <Text style={styles.textEdit}>UPDATE PHOTO</Text>
          </View>
        </View>
        <View style={[styles.overlay, styles.boxShadow]} />
      </View>

      <View style={styles.wrapButton}>
        <Pressable
          onPress={logout}
          style={[styles.buttonContainer, styles.boxShadow]}>
          <Text style={styles.textButton}>logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    backgroundColor: '#f0f2f4',
  },
  contentTopContainer: {
    position: 'relative',
  },
  overlay: {
    height: '120%',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    transform: [{scaleX: 1.5}],
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
    marginHorizontal: 12,
  },
  buttonEdit: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 28,
    marginBottom: 8,
  },
  textEdit: {
    color: '#505965',
    fontSize: 12,
  },
  wrapButton: {
    marginHorizontal: 35,
  },
  buttonContainer: {
    paddingVertical: 14,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    top: '60%',
    backgroundColor: '#fff',
  },
  textButton: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
    color: '#fe3a85',
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
