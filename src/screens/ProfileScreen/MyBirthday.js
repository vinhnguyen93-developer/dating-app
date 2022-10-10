import moment from 'moment';
import {useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import ButtonPrimary from '../../components/Button/ButtonPrimary';
import {setUserInfo} from '../../redux/actions/auth';

const MyBirthday = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const day2 = useRef();
  const month1 = useRef();
  const month2 = useRef();
  const year1 = useRef();
  const year2 = useRef();
  const year3 = useRef();
  const year4 = useRef();

  const [dayFirst, setDayFirst] = useState('');
  const [daySecond, setDaySecond] = useState('');
  const [monthFirst, setMonthFirst] = useState('');
  const [monthSecond, setMonthSecond] = useState('');
  const [yearOne, setYearOne] = useState('');
  const [yearTwo, setYearTwo] = useState('');
  const [yearThree, setYearThree] = useState('');
  const [yearFour, setYearFour] = useState('');
  const [dataUser, setDataUser] = useState({});

  const [birthdayValid, setBirthdayValid] = useState(false);

  const dispatch = useDispatch();

  const day = dayFirst + daySecond;
  const month = monthFirst + monthSecond;
  const year = yearOne + yearTwo + yearThree + yearFour;

  useMemo(() => {
    const birthday = day + '/' + month + '/' + year;
    const isBirthday = moment(birthday, 'DD/MM/YYYY', true).isValid();

    const ages = Math.floor(
      moment().diff(moment(birthday, 'DD/MM/YYYY'), 'years', true),
    );

    isBirthday ? setBirthdayValid(true) : setBirthdayValid(false);
    setDataUser({
      birthday,
      ages,
    });
  }, [day, month, year]);

  const handleSubmit = data => {
    dispatch(setUserInfo(data));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.View animation="fadeIn" style={styles.iconBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5Icon name="angle-left" size={34} color="#A1A0A0" />
          </TouchableOpacity>
        </Animatable.View>
      </View>
      <View style={styles.wrapTile}>
        <Text style={styles.textTile}>My birthday is</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.wrapInput}>
          <TextInput
            style={styles.textInput}
            placeholder="D"
            onChangeText={value => {
              setDayFirst(value);
              day2.current.focus();
            }}
            selectTextOnFocus
            keyboardType="number-pad"
            maxLength={1}
          />
          <TextInput
            style={styles.textInput}
            placeholder="D"
            onChangeText={value => {
              setDaySecond(value);
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
              setMonthFirst(value);
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
              setMonthSecond(value);
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
              setYearOne(value);
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
              setYearTwo(value);
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
              setYearThree(value);
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
            onChangeText={value => setYearFour(value)}
            keyboardType="number-pad"
            selectTextOnFocus
            maxLength={1}
            ref={year4}
          />
        </View>
        <Text style={styles.contentDescription}>Your age will be public.</Text>
      </View>

      <TouchableOpacity
        disabled={!birthdayValid}
        onPress={() => handleSubmit(dataUser)}
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
  header: {
    marginLeft: 30,
    marginBottom: 10,
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
