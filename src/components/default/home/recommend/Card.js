import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

export default function Card({data, length, index}) {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  Animated.timing(
    // 随时间变化而执行动画
    fadeAnim, // 动画中的变量值
    {
      toValue: 1, // 透明度最终变为1，即完全不透明
      easing: Easing.linear,
      duration: 200, // 让动画持续一段时间
      useNativeDriver: true,
    },
  ).start(); // 开始执行动画

  const press = function () {
    navigation.navigate('Player', {
      id: Math.random() * 1000,
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={press}
      style={[length % 2 !== 0 && index === 0 ? styles.one : styles.two]}>
      <Animated.View style={[styles.card, {opacity: fadeAnim}]}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.more_inf}>
            <View style={{flexDirection: 'row', columnGap: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#fff'}}>
                  <Icon name="play-circle" size={14} color="#bbbdc0" />
                </Text>
                <Text style={{color: '#fff', marginLeft: 3}}>6023</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>
                  <Icon name="comment-o" size={14} color="#bbbdc0" />
                </Text>
                <Text style={{color: '#fff', marginLeft: 3}}>2</Text>
              </View>
            </View>
            <Text style={{color: '#fff'}}>{data.time}</Text>
          </View>
        </ImageBackground>
        <View style={styles.video_inf}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            textBreakStrategy="simple"
            style={styles.title}>
            {data.title}
          </Text>
          <View style={styles.other_inf}>
            <View style={styles.author_inf}>
              <Text>
                <Icon name="rocket" size={12} color="#bbbdc0" />
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.author_name}>
                {data.title}
              </Text>
            </View>
            <Text>
              <Icon name="ellipsis-v" size={12} color="#bbbdc0" />
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  one: {
    width: '100%',
    height: 270,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  two: {
    width: '49%',
    height: 210,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  more_inf: {
    width: '100%',
    position: 'absolute',
    bottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  video_inf: {
    height: 80,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: '#000',
    fontSize: 12,
  },
  other_inf: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  author_inf: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 12,
  },
  author_name: {
    fontSize: 12,
    marginLeft: 5,
  },
});
