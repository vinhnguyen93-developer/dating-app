import React from 'react';
import {StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../screens/HomeScreen/Home';

const Tabs = createBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          }

          return <Feather name={iconName} size={size} color="#888888" />;
        },
      })}>
      <Tabs.Screen name="Home" component={Home} />
    </Tabs.Navigator>
  );
};

export default TabsNavigation;

const styles = StyleSheet.create({});
