import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ButtonPrimary from '../components/Button/ButtonPrimary';
import ButtonOutline from '../components/Button/ButtonOutline';
import {useAuthContext} from '../context/AuthContext';

const Welcome = () => {
  const {logout} = useAuthContext();

  const [active, setActive] = useState(false);

  const chooseButton = () => {
    setActive(!active);
  };

  return (
    <View style={{marginHorizontal: 15}}>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={logout}>
        <ButtonPrimary title={'LOG OUT'} active={true} />
      </TouchableOpacity>

      <TouchableOpacity onPress={chooseButton} style={{marginTop: 20}}>
        <ButtonOutline title={'MAN'} active={active} />
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop: 20}}>
        <ButtonOutline title={'WOMEN'} active={false} />
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop: 20}}>
        <ButtonOutline title={'EVERYONE'} active={false} />
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
