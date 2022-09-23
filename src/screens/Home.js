import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {AuthContext} from '../context/AuthContext';

const Home = () => {
  const {logout} = useContext(AuthContext);

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
