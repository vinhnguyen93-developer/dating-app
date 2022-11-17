import * as Animatable from 'react-native-animatable';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ButtonPrimary from '../Button/ButtonPrimary';
import ButtonOutline from '../Button/ButtonOutline';
import {updateGenderExpect} from '../../lib/user';

const EditGenderExpect = ({route, navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const {profile} = route.params;

  const [buttonMan, setButtonMan] = useState(false);
  const [buttonWoman, setButtonWoman] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [gender, setGender] = useState(profile?.gender_expect);

  const handleChoose = data => {
    setGender(data);
    setButtonActive(true);
    if (data === 'male') {
      setButtonMan(true);
      setButtonWoman(false);
    } else {
      setButtonMan(false);
      setButtonWoman(true);
    }
  };

  useMemo(() => {
    setGender(profile?.gender_expect);
    if (profile?.gender_expect === 'male') {
      setButtonMan(true);
      setButtonWoman(false);
    } else {
      setButtonMan(false);
      setButtonWoman(true);
    }
  }, [profile]);

  const handleSubmit = async data => {
    await updateGenderExpect(profile?.uid, data);
    navigation.goBack();
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
        <Text style={styles.textTile}>Edit gender expect</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.wrapButton}>
          <TouchableOpacity
            onPress={() => handleChoose('female')}
            style={styles.buttonSub}>
            <ButtonOutline title={'WOMAN'} active={buttonWoman} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleChoose('male')}
            style={styles.buttonSub}>
            <ButtonOutline title={'MAN'} active={buttonMan} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        disabled={!buttonActive}
        onPress={() => handleSubmit(gender)}
        style={styles.buttonContinue}>
        <ButtonPrimary title={'UPDATE'} active={buttonActive} />
      </TouchableOpacity>
    </View>
  );
};

export default EditGenderExpect;

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
    marginTop: 45,
  },
  wrapButton: {
    marginBottom: 10,
  },
  buttonSub: {
    marginVertical: 10,
  },
  buttonContinue: {
    marginHorizontal: 30,
    marginTop: '80%',
  },
});
