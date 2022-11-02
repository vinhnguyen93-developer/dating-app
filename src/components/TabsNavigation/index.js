import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../screens/HomeScreen/Home';
import LikeScreen from '../../screens/HomeScreen/Like';
import ChatsScreen from '../../screens/HomeScreen/Chats';
import ProfileScreen from '../../screens/HomeScreen/Profile';

const Tabs = createBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'heart' : 'heart';
          } else if (route.name === 'Like') {
            iconName = focused ? 'th-large' : 'th-large';
          } else if (route.name === 'Chats') {
            iconName = focused ? 'comments' : 'comments';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }

          return (
            <FontAwesome5Icon name={iconName} size={size} color={color} solid />
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fe3a85',
        tabBarStyle: {
          borderTopWidth: 0,
        },
        headerShown: false,
      })}>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Like" component={LikeScreen} />
      <Tabs.Screen name="Chats" component={ChatsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default TabsNavigation;
