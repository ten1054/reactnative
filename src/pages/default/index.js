import HomeScreen from './home.js';
import SettingsScreen from './Settings.js';
import NotNormalScreen from './NotNormal.js';
import MyTab from '../../components/BottomTab/tab.js';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function () {
  return (
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
        name="Yellow"
        options={{
          title: '不正经',
          headerShown: false,
        }}
        component={NotNormalScreen}
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
  );
}
