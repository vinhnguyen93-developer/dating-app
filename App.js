import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StackNavigator from './src/utils/StackNavigator';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
