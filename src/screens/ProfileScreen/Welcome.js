import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import ButtonPrimary from '../../components/Button/ButtonPrimary';
import {useAuthContext} from '../../context/AuthContext';

const Welcome = ({navigation}) => {
  const {logout} = useAuthContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapLogo}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-t.png')}
        />
      </View>
      <View style={styles.wrapTile}>
        <Text style={styles.textTile}>Welcome to Dating app.</Text>
        <Text style={styles.textSubTile}>Please follow these house rules.</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.contentWrapTitle}>
          <FontAwesome5Icon name="check" color={'#fe3a85'} size={24} />
          <Text style={styles.contentTitle}>Be yourself.</Text>
        </View>
        <Text style={styles.contentDescription}>
          Make sure your photos, age and bio are true to who you are.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.contentWrapTitle}>
          <FontAwesome5Icon name="check" color={'#fe3a85'} size={24} />
          <Text style={styles.contentTitle}>Stay safe.</Text>
        </View>
        <Text style={styles.contentDescription}>
          Don't be too quick to give out personal information.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.contentWrapTitle}>
          <FontAwesome5Icon name="check" color={'#fe3a85'} size={24} />
          <Text style={styles.contentTitle}>Play it cool.</Text>
        </View>
        <Text style={styles.contentDescription}>
          Respect others and treat them as you would like to be treated.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.contentWrapTitle}>
          <FontAwesome5Icon name="check" color={'#fe3a85'} size={24} />
          <Text style={styles.contentTitle}>Be proactive.</Text>
        </View>
        <Text style={styles.contentDescription}>
          Always report bad behavior.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('First name')}
        style={styles.buttonAgree}>
        <ButtonPrimary title={'I AGREE'} active={true} />
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: '25%',
  },
  wrapLogo: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 50,
  },
  wrapTile: {
    width: '100%',
    alignItems: 'center',
  },
  textTile: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B5B5B',
  },
  textSubTile: {
    fontSize: 13,
    color: '#646464',
  },
  contentContainer: {
    marginHorizontal: 45,
    marginTop: 45,
  },
  contentWrapTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4F4F4F',
    marginLeft: 10,
  },
  contentDescription: {
    color: '#646464',
    fontSize: 14,
  },
  buttonAgree: {
    marginHorizontal: 30,
    marginTop: '20%',
  },
});
