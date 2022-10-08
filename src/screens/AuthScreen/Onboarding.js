import React, {useLayoutEffect, useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

import SocialButton from '../../components/Button/SocialButton';

const Onboarding = ({navigation}) => {
  const [socialLogin, setSocialLogin] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        style={styles.image}
        source={require('../../assets/images/dating.png')}
      />

      {socialLogin && (
        <Animatable.View animation="fadeIn" style={styles.iconBack}>
          <TouchableOpacity onPress={() => setSocialLogin(false)}>
            <FontAwesome5Icon name="angle-left" size={30} color="white" />
          </TouchableOpacity>
        </Animatable.View>
      )}

      <View style={styles.buttonWrap}>
        {socialLogin ? (
          <Animatable.View animation="fadeInUp">
            <SocialButton
              icon={'google'}
              title="SIGN IN WITH GOOGLE"
              bottom={120}
            />

            <SocialButton
              icon={'facebook'}
              title="SIGN IN WITH FACEBOOK"
              bottom={60}
            />
          </Animatable.View>
        ) : (
          <Animatable.View animation="fadeInDown">
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={[styles.button, styles.buttonRegister]}>
              <Text style={[styles.text, styles.textRegister]}>
                CREATE ACCOUNT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={[styles.button, styles.buttonLogin]}>
              <Text style={[styles.text, styles.textLogin]}>SIGN IN</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  buttonWrap: {
    paddingHorizontal: 25,
  },
  button: {
    position: 'absolute',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 24,
    width: '100%',
  },
  buttonRegister: {
    bottom: 160,
    backgroundColor: 'white',
  },
  buttonLogin: {
    bottom: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  textRegister: {
    color: '#666',
  },
  textLogin: {
    color: 'white',
  },
  iconBack: {
    position: 'absolute',
    top: 60,
    paddingLeft: 25,
  },
});
