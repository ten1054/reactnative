import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View} from 'react-native';
import TopBar from '../../components/home/TopBar';
import Children from '../../components/home/child/Children';

const Tab = createMaterialTopTabNavigator();
export default function () {
  return (
    <View style={{flex: 1}}>
      <TopBar></TopBar>
      <Children></Children>
    </View>
  );
}
