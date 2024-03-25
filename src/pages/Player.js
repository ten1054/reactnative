import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Introduce from '../components/default/player/introduce';
import Comment from '../components/default/player/comment';

// const renderScene = SceneMap({
//   introduce: Introduce,
//   comment: Comment,
// });

export default function Player({route}) {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'introduce', title: '简介'},
    {key: 'comment', title: '评论'},
  ]);
  const back = () => {
    navigation.goBack();
  };

  const renderScene = all => {
    switch (all.route.key) {
      case 'introduce':
        return <Introduce params={route.params} />;
      case 'comment':
        return <Comment params={route.params} />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{width: '100%', height: 220, backgroundColor: '#000'}}>
        <View style={[styles.video_control]}>
          <Text onPress={back}>
            <Icon name="angle-left" size={20} color="#fff" />
          </Text>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={{backgroundColor: '#fff'}}
        sceneContainerStyle={{paddingHorizontal: 15}}
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
const styles = StyleSheet.create({
  video_control: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    padding: 10,
  },
});
