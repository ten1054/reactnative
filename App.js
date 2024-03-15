/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/pages/home/index.js';
import SettingsScreen from './src/pages/Settings.js';
import MyTab from './src/components/BottomTab/tab.js';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <MyTab {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '首页',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          options={{
            title: '设置',
            headerShown: false,
          }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
