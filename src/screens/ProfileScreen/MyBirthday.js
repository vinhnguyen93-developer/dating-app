import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

import ButtonPrimary from '../../components/Button/ButtonPrimary';
import {setUserInfo} from '../../redux/actions/auth';
import {useAuthContext} from '../../context/AuthContext';

const MyBirthday = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const {logout} = useAuthContext();

  const day2 = useRef();
  const month1 = useRef();
  const month2 = useRef();
  const year1 = useRef();
  const year2 = useRef();
  const year3 = useRef();
  const year4 = useRef();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [birthdayValid, setBirthdayValid] = useState(false);

  const dispatch = useDispatch();

  useMemo(() => {
    const birthday = day + '/' + month + '/' + year;
    console.log(birthday);

    const isBirthday = moment(birthday, 'DD/MM/YYYY', true).isValid();
    isBirthday ? setBirthdayValid(true) : setBirthdayValid(false);
  }, [day, month, year]);

  console.log(birthdayValid);

  return (
    <View style={styles.container}>
      <View style={styles.wrapTile}>
        <Text style={styles.textTile}>My birthday is</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.wrapInput}>
          <TextInput
            style={styles.textInput}
            placeholder="D"
            onChangeText={value => {
              setDay(value);
              day2.current.focus();
            }}
            keyboardType="number-pad"
            maxLength={1}
          />
          <TextInput
            style={styles.textInput}
            placeholder="D"
            onChangeText={value => {
              setDay(prev => prev + value);
              month1.current.focus();
            }}
            selectTextOnFocus
            maxLength={1}
            keyboardType="number-pad"
            ref={day2}
          />
          <Text style={styles.labelInput}>/</Text>

          <TextInput
            style={styles.textInput}
            placeholder="M"
            onChangeText={value => {
              setMonth(value);
              month2.current.focus();
            }}
            selectTextOnFocus
            keyboardType="number-pad"
            maxLength={1}
            ref={month1}
          />
          <TextInput
            style={styles.textInput}
            placeholder="M"
            onChangeText={value => {
              setMonth(prev => prev + value);
              year1.current.focus();
            }}
            selectTextOnFocus
            keyboardType="number-pad"
            maxLength={1}
            ref={month2}
          />
          <Text style={styles.labelInput}>/</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Y"
            onChangeText={value => {
              setYear(value);
              year2.current.focus();
            }}
            selectTextOnFocus
            keyboardType="number-pad"
            maxLength={1}
            ref={year1}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Y"
            onChangeText={value => {
              setYear(prev => prev + value);
              year3.current.focus();
            }}
            selectTextOnFocus
            keyboardType="number-pad"
            maxLength={1}
            ref={year2}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Y"
            onChangeText={value => {
              setYear(prev => prev + value);
              year4.current.focus();
            }}
            selectTextOnFocus
            keyboardType="number-pad"
            maxLength={1}
            ref={year3}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Y"
            onChangeText={value => setYear(prev => prev + value)}
            keyboardType="number-pad"
            selectTextOnFocus
            maxLength={1}
            ref={year4}
          />
        </View>
        {/* {errors.firstName && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{errors.firstName}</Text>
          </Animatable.View>
        )} */}
        <Text style={styles.contentDescription}>Your age will be public.</Text>
      </View>

      <TouchableOpacity
        disabled={!birthdayValid}
        onPress={logout}
        style={styles.buttonContinue}>
        <ButtonPrimary title={'CONTINUE'} active={birthdayValid} />
      </TouchableOpacity>
    </View>
  );
};

export default MyBirthday;

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
    marginBottom: 10,
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 18,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#A1A1A1',
    marginRight: 6,
  },
  labelInput: {
    fontSize: 20,
    marginHorizontal: 6,
    color: '#A1A1A1',
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
