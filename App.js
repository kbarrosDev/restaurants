
import React from 'react';

import Navigation from './navigations/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/account/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Navigation/>
    
  );
  
}
export  function StackView() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    
  );
  
}
