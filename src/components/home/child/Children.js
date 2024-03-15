import React from 'react';
import AnimScreen from './anim/Anim';
import RecommendScreen from './recommend/Recommend';
import {useWindowDimensions, View, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const renderScene = SceneMap({
  recommend: RecommendScreen,
  anim: AnimScreen,
});

export default function () {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'recommend', title: '推荐'},
    {key: 'anim', title: '动画'},
  ]);
  return (
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
  );
}
