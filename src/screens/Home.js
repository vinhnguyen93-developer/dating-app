import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ButtonPrimary from '../components/Button/ButtonPrimary';
import {useAuthContext} from '../context/AuthContext';

const Home = () => {
  const {logout} = useAuthContext();

  return (
    <View>
      <Text>Welcome Home Screen!</Text>
      <TouchableOpacity onPress={logout}>
        <ButtonPrimary title={'LOG OUT'} active={true} onTapping={logout} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
