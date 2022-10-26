import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useAuthContext} from '../../context/AuthContext';
import ButtonPrimary from '../../components/Button/ButtonPrimary';

const ChatsScreen = () => {
  const {logout} = useAuthContext();

  return (
    <View>
      <Text>ChatsScreen</Text>
      <TouchableOpacity onPress={logout}>
        <ButtonPrimary title={'LOGOUT'} active={true} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
