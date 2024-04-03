import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {enterVideo} from '../serve/home';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

export default function DmPlayer({route}) {
  const navigation = useNavigation();
  //获取设备的宽度和高度
  const {width: deviceWidth} = Dimensions.get('window');
  const [videoInf, setVideoInf] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    enterVideo(route.params.id, route.params.number, res => {
      setVideoInf(res);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    });
  }, [route.params.id, route.params.number]);

  const switchEpisodes = i => {
    navigation.setParams({
      id: route.params.id,
      number: i,
    });
  };
  const render = () => {
    if (!isLoading) {
      return (
        <View style={{flex: 1}}>
          <View style={{width: deviceWidth, height: deviceWidth * (9 / 16)}}>
            <Video
              style={styles.video}
              source={{
                uri: videoInf.url,
              }}
              resizeMode={'cover'}
              controls={true}></Video>
          </View>
          <SafeAreaView style={styles.container}>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}>
              {videoInf.episodesList.map((x, i) => {
                const isActive =
                  Number(videoInf.currentEpisodes) == Number(i) + 1;
                return (
                  <Pressable
                    key={i}
                    style={[
                      styles.episodes_box,
                      isActive
                        ? styles.active_episodes
                        : styles.no_active_episodes,
                    ]}
                    onPress={() => {
                      switchEpisodes(i + 1);
                    }}>
                    <Text
                      style={[
                        isActive
                          ? styles.active_episodes
                          : styles.no_active_episodes,
                        styles.episodes_button,
                      ]}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}>
                      第{i + 1}集
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </View>
      );
    }
    return (
      <View>
        <View
          style={{
            width: deviceWidth,
            height: deviceWidth * (9 / 16),
            backgroundColor: '#000',
          }}></View>
      </View>
    );
  };
  return <>{render()}</>;
}
const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20,
    paddingHorizontal: 10,
    columnGap: 3,
    rowGap: 5,
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  episodes_button: {
    fontSize: 13,
  },
  episodes_box: {
    width: '16%',
    paddingHorizontal: 3,
    paddingVertical: 10,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  no_active_episodes: {
    color: '#999999',
  },
  active_episodes: {
    color: '#fff',
    backgroundColor: '#fc8bab',
  },
});
