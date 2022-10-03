import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as ReduxProvider} from 'react-redux';

import StackNavigator from './src/utils/StackNavigator';
import {AuthProvider} from './src/context/AuthContext';
import store from './src/redux/store';

const App = () => {
  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </ReduxProvider>
    </NavigationContainer>
  );
};

export default App;
