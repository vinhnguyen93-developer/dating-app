import * as Animatable from 'react-native-animatable';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import ButtonPrimary from '../../components/Button/ButtonPrimary';
import {useAuthContext} from '../../context/AuthContext';

const ChangePassword = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const {changePassword} = useAuthContext();

  const ChangePasswordSchema = Yup.object().shape({
    old_password: Yup.string().required('Please enter your old password!'),
    new_password: Yup.string()
      .min(8, 'New password must be at least 8 characters')
      .required('Please enter your new password!')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{8,}$/,
        'Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
      ),
    new_password_confirm: Yup.string()
      .oneOf([Yup.ref('new_password')], 'Your new password do not match!')
      .required('Confirm new password is required!'),
  });

  return (
    <Formik
      initialValues={{
        old_password: '',
        new_password: '',
        new_password_confirm: '',
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={values => {
        changePassword(values.old_password, values.new_password, navigation);
      }}>
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
          <View style={styles.header}>
            <Animatable.View animation="fadeIn" style={styles.iconBack}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome5Icon name="angle-left" size={34} color="#A1A0A0" />
              </TouchableOpacity>
            </Animatable.View>
          </View>
          <View style={styles.wrapTile}>
            <Text style={styles.textTile}>Change password</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={values.old_password}
              onChangeText={handleChange('old_password')}
              style={styles.input}
              placeholder="Old password"
              secureTextEntry
              onBlur={() => setFieldTouched('old_password')}
            />
            {touched.old_password && errors.old_password && (
              <View>
                <Text style={styles.errorMsg}>{errors.old_password}</Text>
              </View>
            )}
            <TextInput
              value={values.new_password}
              onChangeText={handleChange('new_password')}
              style={styles.input}
              secureTextEntry
              placeholder="New password"
              onBlur={() => setFieldTouched('new_password')}
            />
            {touched.new_password && errors.new_password && (
              <View>
                <Text style={styles.errorMsg}>{errors.new_password}</Text>
              </View>
            )}
            <TextInput
              value={values.new_password_confirm}
              onChangeText={handleChange('new_password_confirm')}
              style={styles.input}
              secureTextEntry
              placeholder="New password confirm"
              onBlur={() => setFieldTouched('new_password_confirm')}
            />
            {touched.new_password_confirm && errors.new_password_confirm && (
              <View>
                <Text style={styles.errorMsg}>
                  {errors.new_password_confirm}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => handleSubmit()}
            disabled={!isValid}
            style={styles.buttonContinue}>
            <ButtonPrimary title={'Change password'} active={true} />
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: '25%',
  },
  header: {
    marginLeft: 30,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  input: {
    paddingVertical: 10,
    paddingLeft: 10,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 8,
    borderColor: '#999',
    marginBottom: 6,
    marginTop: 12,
  },
  wrapTile: {
    width: '100%',
    marginHorizontal: 30,
  },
  textTile: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonContinue: {
    marginHorizontal: 30,
    marginTop: '70%',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    paddingLeft: 4,
  },
});
