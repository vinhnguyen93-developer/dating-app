import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useAuthContext} from '../context/AuthContext';

const Home = () => {
  const {logout} = useAuthContext();

  return (
    <View>
      <Text>Welcome!</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
