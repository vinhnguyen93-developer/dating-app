import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';

import {AuthContext} from '../context/AuthContext';

// Auth screen
import Onboarding from '../screens/AuthScreen/Onboarding';
import Register from '../screens/AuthScreen/Register';
import SignIn from '../screens/AuthScreen/SignIn';

// Screen with tab navigation
import TabsNavigation from '../components/TabsNavigation';

// User profile screen
import Welcome from '../screens/ProfileScreen/Welcome';
import FirstName from '../screens/ProfileScreen/FirstName';
import MyBirthday from '../screens/ProfileScreen/MyBirthday';
import MyGender from '../screens/ProfileScreen/MyGender';
import ShowMe from '../screens/ProfileScreen/ShowMe';
import Interests from '../screens/ProfileScreen/Interests';
import MyLocation from '../screens/ProfileScreen/MyLocation';
import MyPhoto from '../screens/ProfileScreen/MyPhoto';
import UserDetail from '../screens/HomeScreen/UserDetail';
import UserView from '../components/UserView';
import Matching from '../screens/HomeScreen/Matching';
import MessageScreen from '../screens/HomeScreen/Message';
import {setUserInfo} from '../redux/actions/auth';
import LogoTitle from '../components/LogoTitle';
import MessageHeader from '../components/MessageHeader';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const {user, setUser} = useContext(AuthContext);

  const dispatch = useDispatch();

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

    const getUserProfile = async () => {
      if (user) {
        await fireStore()
          .collection('users')
          .doc(user?.uid)
          .onSnapshot(snapshot => {
            if (snapshot.exists) {
              dispatch(setUserInfo(snapshot.data()));
              setIsProfileUpdate(true);
            } else {
              setIsProfileUpdate(false);
            }
          });
      } else {
        setIsProfileUpdate(false);
      }
    };

    getUserProfile();

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
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              options={{
                headerTitle: props => <LogoTitle {...props} />,
                headerShadowVisible: false,
              }}
              name="Root"
              component={TabsNavigation}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="User detail"
              component={UserDetail}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Matching"
              component={Matching}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="User view"
              component={UserView}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="Message"
              component={MessageScreen}
              options={({route, navigation}) => ({
                headerBackTitleVisible: false,
                headerTitle: props => (
                  <MessageHeader
                    navigation={navigation}
                    userMatched={route.params.userMatched}
                    profile={route.params.profile}
                  />
                ),
              })}
            />
          </Stack.Group>
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
          <Stack.Screen name="Interests" component={Interests} />
          <Stack.Screen name="My location" component={MyLocation} />
          <Stack.Screen name="My photo" component={MyPhoto} />
        </Stack.Navigator>
      );
    }
  }
};

export default StackNavigator;
