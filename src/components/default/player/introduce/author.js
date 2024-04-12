import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Easing,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
export default function Author({authorInf}) {
  const [isChange, setChange] = useState(true);
  const opacityValue = useRef(new Animated.Value(0.4)).current;
  const anm = useRef(null);
  anm.current = Animated.loop(
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 1,
        easing: Easing.linear,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.4,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
  );
  const followAuthor = () => {
    setAuthorInf({
      ...authorInf,
      isFollowed: !authorInf?.isFollowed,
    });
  };
  const authorLoading = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {}
          <Animated.View
            style={[styles.image, {opacity: opacityValue}]}></Animated.View>
          <View style={{marginLeft: 15, justifyContent: 'center', rowGap: 5}}>
            <Animated.Text
              style={[styles.loading, {opacity: opacityValue}]}></Animated.Text>
            <View style={{flexDirection: 'row', columnGap: 15}}>
              <Animated.Text
                style={[
                  styles.loading,
                  {width: 20, opacity: opacityValue},
                ]}></Animated.Text>
              <Animated.Text
                style={[
                  styles.loading,
                  {width: 20, opacity: opacityValue},
                ]}></Animated.Text>
            </View>
          </View>
        </View>
        <Animated.View
          style={[
            styles.loading,
            {width: 70, height: 30, opacity: opacityValue},
          ]}></Animated.View>
      </View>
    );
  };

  useEffect(() => {
    if (Object.keys(authorInf).length === 0) {
      setChange(true);
      anm.current.start();
    } else {
      setChange(false);
      anm.current.reset();
    }
  }, [authorInf]);

  if (isChange) {
    return authorLoading();
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {}
        <Image
          source={authorInf?.avatar || image}
          resizeMode="cover"
          style={styles.image}></Image>
        <View style={{marginLeft: 15, justifyContent: 'center'}}>
          <Text style={{color: '#ff679a'}}>{authorInf?.name}</Text>
          <View style={{flexDirection: 'row', columnGap: 15}}>
            <Text style={{fontSize: 12}}>{authorInf?.fans}粉丝</Text>
            <Text style={{fontSize: 12}}>{authorInf?.videoCount}视频</Text>
          </View>
        </View>
      </View>
      <Pressable
        style={[
          authorInf?.isFollowed ? styles.followed : styles.no_followed,
          styles.follower_button,
        ]}
        onPress={followAuthor}>
        <Text>
          <Icon name="plus" size={13} color="#fff" />
        </Text>
        <Text style={{marginLeft: 5, marginTop: -4, color: '#fff'}}>
          {' '}
          {authorInf?.isFollowed ? '已关注' : '关注'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    color: '#ff679a',
    width: 50,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  followed: {
    backgroundColor: '#c9c9c9',
  },
  no_followed: {
    backgroundColor: '#ff679a',
  },
  follower_button: {
    flexDirection: 'row',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    color: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
});
