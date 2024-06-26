import React from 'react';
import TopBar from '../../components/default/TopBar.js';
import ChinaAnimScreen from '../../components/default/home/anim/China.js';
import JapanAnimScreen from '../../components/default/home/anim/Japan.js';
import ForeignAnimScreen from '../../components/default/home/anim/Foreign.js';
import RecommendScreen from '../../components/default/home/recommend/Index.js';
import {useWindowDimensions, View, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const renderScene = SceneMap({
  recommend: RecommendScreen,
  chinaAnm: ChinaAnimScreen,
  japanAnm: JapanAnimScreen,
  foreignAnm: ForeignAnimScreen,
});

export default function () {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'japanAnm', title: '日本动画'},
    {key: 'chinaAnm', title: '国产动画'},
    {key: 'foreignAnm', title: '外国动画'},
    {key: 'recommend', title: '推荐'},
  ]);
  return (
    <View style={{flex: 1}}>
      <TopBar></TopBar>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={{backgroundColor: '#f0f1f3'}}
        sceneContainerStyle={{paddingHorizontal: 10}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: '#f55c9b'}}
            activeColor="#f55c9b"
            inactiveColor="#000"
            style={{
              backgroundColor: '#fff',
              shadowColor: 'transparent',
              marginBottom: 10,
            }}
          />
        )}
      />
    </View>
  );
}
