import {useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useLayoutEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ButtonPrimary from '../../components/Button/ButtonPrimary';
import {setUserInfo} from '../../redux/actions/auth';
import {city_data} from '../../utils/constants';
import {useAuthContext} from '../../context/AuthContext';

const MyLocation = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const dispatch = useDispatch();
  const {logout} = useAuthContext();

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleSubmit = data => {
    dispatch(
      setUserInfo({
        city: data,
      }),
    );

    logout();
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
        <Text style={styles.textTile}>My location</Text>
        <Text style={styles.contentDescription}>
          Let everyone know where you living in.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: '#fe3a85'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={city_data}
          search
          maxHeight={350}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select your city' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Feather
              style={styles.icon}
              color={isFocus ? '#fe3a85' : '#ADADAD'}
              name="map-pin"
              size={20}
            />
          )}
        />
      </View>

      <TouchableOpacity
        disabled={value ? false : true}
        onPress={() => handleSubmit(value)}
        style={styles.buttonContinue}>
        <ButtonPrimary title={'CONTINUE'} active={value ? true : false} />
      </TouchableOpacity>
    </View>
  );
};

export default MyLocation;

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
    marginHorizontal: 35,
    marginTop: 60,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#646464',
  },
  buttonContinue: {
    marginHorizontal: 30,
    marginTop: '95%',
  },
  contentDescription: {
    color: '#646464',
    fontSize: 14,
  },
  icon: {
    marginRight: 10,
  },
});
