import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';

import {AuthContext} from '../context/AuthContext';

// Auth screen
import Onboarding from '../screens/AuthScreen/Onboarding';
import Register from '../screens/AuthScreen/Register';
import SignIn from '../screens/AuthScreen/SignIn';

// Home screen
import Home from '../screens/HomeScreen/Home';

// User profile screen
import Welcome from '../screens/ProfileScreen/Welcome';
import FirstName from '../screens/ProfileScreen/FirstName';
import MyBirthday from '../screens/ProfileScreen/MyBirthday';
import MyGender from '../screens/ProfileScreen/MyGender';
import ShowMe from '../screens/ProfileScreen/ShowMe';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [isProfileUpdate, setIsProfileUpdate] = useState(true);

  const onAuthStateChanged = users => {
    setUser(users);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    fireStore()
      .collection('users')
      .doc(user?.uid)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setIsProfileUpdate(true);
        } else {
          setIsProfileUpdate(false);
        }
      });

    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <Stack.Navigator
        defaultScreenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    );
  } else {
    if (isProfileUpdate) {
      return (
        <Stack.Navigator
          defaultScreenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator
          defaultScreenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="First name" component={FirstName} />
          <Stack.Screen name="My birthday" component={MyBirthday} />
          <Stack.Screen name="My gender" component={MyGender} />
          <Stack.Screen name="Show me" component={ShowMe} />
        </Stack.Navigator>
      );
    }
  }
};

export default StackNavigator;
