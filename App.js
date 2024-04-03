/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DefaultScreen from './src/pages/default/index.js';
import PlayerScreen from './src/pages/Player.js';
import DmPlayerScreen from './src/pages/DmPlayer.js';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Default"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Default" component={DefaultScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="DmPlayer" component={DmPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
