import React, {useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {useAuthContext} from '../context/AuthContext';
import ButtonPrimary from '../components/Button/ButtonPrimary';

const Register = ({navigation}) => {
  const [data, setData] = React.useState({
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const {register} = useAuthContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email address!'),
    password: Yup.string()
      .min(8)
      .required('Please enter your password!')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{8,}$/,
        'Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Your password do not match!')
      .required('Confirm password is required!'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => register(values.email, values.password)}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={styles.header}>
            <Animatable.View animation="fadeIn" style={styles.iconBack}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome5 name="angle-left" size={30} color="white" />
              </TouchableOpacity>
            </Animatable.View>

            <Text style={styles.text_header}>Register Now!</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
              <Text style={styles.text_footer}>Email</Text>
              <View style={styles.action}>
                <FontAwesome5 name="user" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
                {!errors.email && (
                  <Animatable.View animation="bounceIn">
                    <FontAwesome5 name="check-circle" color="green" size={20} />
                  </Animatable.View>
                )}
              </View>
              {touched.email && errors.email && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{errors.email}</Text>
                </Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}>
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" light size={20} />
                <TextInput
                  placeholder="Your Password"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{errors.password}</Text>
                </Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}>
                Confirm Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />
                <TextInput
                  placeholder="Confirm Your Password"
                  secureTextEntry={data.confirm_secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                />
                <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                  {data.confirm_secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{errors.confirmPassword}</Text>
                </Animatable.View>
              )}

              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                  By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                  {' '}
                  Terms of service
                </Text>
                <Text style={styles.color_textPrivate}> and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                  {' '}
                  Privacy policy
                </Text>
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  disabled={!isValid}
                  onPress={handleSubmit}>
                  <ButtonPrimary title={'Sign Up'} active={isValid} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animatable.View>
        </View>
      )}
    </Formik>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fe6289',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginTop: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  iconBack: {
    top: -60,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});
