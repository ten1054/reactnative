import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function videoCard({card}) {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const press = () => {
    navigation.navigate('Player', {
      id: Math.random() * 1000,
    });
  };
  const anm = Animated.timing(
    // 随时间变化而执行动画
    fadeAnim, // 动画中的变量值
    {
      toValue: 1, // 透明度最终变为1，即完全不透明
      easing: Easing.linear,
      duration: 200, // 让动画持续一段时间
      useNativeDriver: true,
    },
  );
  useEffect(() => {
    anm.start();
  }, []);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={press}>
      <Animated.View style={[styles.card, {opacity: fadeAnim}]}>
        <Image source={image} resizeMode="cover" style={styles.image}></Image>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={{color: '#000', fontWeight: '700'}}>
            {card.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text>
              <Icon name="reddit-alien" size={14} color="#bbbdc0" />
            </Text>
            <Text style={{marginLeft: 3, fontSize: 11}}>{card.author}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 10,
              alignItems: 'center',
              marginTop: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>
                <Icon name="youtube-play" size={14} color="#bbbdc0" />
              </Text>
              <Text style={{marginLeft: 3, fontSize: 11}}>
                {card.playerCount}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>
                <Icon name="commenting" size={14} color="#bbbdc0" />
              </Text>
              <Text style={{marginLeft: 3, fontSize: 11}}>
                {card.commentCount}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  image: {
    width: 130,
    height: 80,
    borderRadius: 5,
  },
});
