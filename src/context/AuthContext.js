import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const loginWithEmailPassword = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert('Something Wrong!', 'Email or password is incorrect!');
    }
  };

  const registerWithEmailPassword = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: loginWithEmailPassword,
        register: registerWithEmailPassword,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
