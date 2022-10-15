import React, {createContext, useState, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {Alert} from 'react-native';
import Config from 'react-native-config';

GoogleSignin.configure({
  iosClientId: Config.IOS_CLIENT_ID,
});

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const loginWithEmailPassword = async (email, password) => {
    try {
      setIsLoading(true);
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => setIsLoading(false));
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Something Wrong!', 'Email or password is incorrect!');
    }
  };

  const registerWithEmailPassword = async (email, password) => {
    try {
      setIsLoading(true);
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => setIsLoading(false));
    } catch (error) {
      Alert.alert(
        'Error!',
        'The email address is already in use by another account.',
      );
    }
  };

  const loginWithGoogle = async () => {
    // Get user id token
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    setIsLoading(true);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => Alert.alert('Error!', error));
  };

  const loginWithFacebook = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    setIsLoading(true);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then(() => {
        setIsLoading(false);
      })
      .catch(error =>
        Alert.alert(
          'Error!',
          'The email address is already in use by another account.',
        ),
      );
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert('Something Wrong!');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: loginWithEmailPassword,
        register: registerWithEmailPassword,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
