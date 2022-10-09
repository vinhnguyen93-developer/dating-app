import React, {useLayoutEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import ButtonPrimary from '../../components/Button/ButtonPrimary';
import {setUserInfo} from '../../redux/actions/auth';

const FirstName = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const dispatch = useDispatch();

  const FirstNameSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name is required'),
  });

  return (
    <Formik
      initialValues={{
        firstName: '',
      }}
      validationSchema={FirstNameSchema}
      onSubmit={values => {
        dispatch(setUserInfo(values));
        navigation.navigate('My birthday');
      }}>
      {({values, errors, handleChange, isValid, handleSubmit}) => (
        <View style={styles.container}>
          <View style={styles.wrapTile}>
            <Text style={styles.textTile}>My first name is</Text>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.wrapInput}>
              <TextInput
                style={styles.textInput}
                placeholder="Your first name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
              />
            </View>
            {errors.firstName && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{errors.firstName}</Text>
              </Animatable.View>
            )}
            <Text style={styles.contentDescription}>
              This is how it will appear in Dating app and you will not be able
              to change it.
            </Text>
          </View>

          <TouchableOpacity
            disabled={!isValid}
            onPress={handleSubmit}
            style={styles.buttonContinue}>
            <ButtonPrimary title={'CONTINUE'} active={isValid} />
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default FirstName;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: '25%',
  },
  wrapTile: {
    width: '100%',
    marginHorizontal: 45,
  },
  textTile: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  contentContainer: {
    marginHorizontal: 45,
    marginTop: 45,
  },
  wrapInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#A1A1A1',
    marginBottom: 10,
  },
  textInput: {
    fontSize: 18,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  contentDescription: {
    color: '#646464',
    fontSize: 14,
  },
  buttonContinue: {
    marginHorizontal: 30,
    marginTop: '20%',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 5,
  },
});
