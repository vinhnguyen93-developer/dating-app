import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/firestore';

import {AuthContext} from '../context/AuthContext';
import Login from '../screens/Login';
import Register from '../screens/Register';
import SignIn from '../screens/SignIn';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';

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

    firebase()
      .collection('user')
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
        <Stack.Screen name="Login" component={Login} />
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
        </Stack.Navigator>
      );
    }
  }
};

export default StackNavigator;
