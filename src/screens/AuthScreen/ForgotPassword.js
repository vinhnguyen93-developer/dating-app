import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Lottie from 'lottie-react-native';

import ButtonPrimary from '../../components/Button/ButtonPrimary';
import {useAuthContext} from '../../context/AuthContext';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const {isLoading, forgotPassword} = useAuthContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.View animation="fadeIn" style={styles.iconBack}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome5 name="angle-left" size={30} color="#A1A0A0" />
            </TouchableOpacity>
          </Animatable.View>

          <Text style={styles.text_header}>Forgot password</Text>
        </View>
        <View style={[styles.footer]}>
          <Text style={[styles.text_footer]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome5 name="user" color="#05375a" size={20} />
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={setEmail}
              onEndEditing={e => e}
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                forgotPassword(email);
              }}
              disabled={email !== '' ? false : true}
              style={styles.signIn}>
              <ButtonPrimary
                title={'Send email'}
                active={email !== '' ? true : false}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isLoading && (
        <Lottie
          style={styles.loading}
          source={require('../../assets/animations/loader.json')}
          autoPlay
          loop
        />
      )}
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#21262e',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 100,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconBack: {
    top: -60,
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
