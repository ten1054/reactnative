import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function VideoInf({videoInf}) {
  const [isLoading, setLoading] = useState(true);
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
  const like = () => {
    setVideoData({
      ...videoInf,
      isLiked: !videoInf.isLiked,
    });
  };
  const coin = () => {};
  const collect = () => {};
  const forward = () => {};
  const loading = () => {
    return (
      <View style={[styles.video_inf]}>
        <Animated.View
          style={{
            width: '100%',
            height: 40,
            borderRadius: 5,
            backgroundColor: '#f0f0f0',
            opacity: opacityValue,
          }}></Animated.View>
        <View style={[styles.statistics]}>
          <Animated.View
            style={[
              styles.statistics_item,
              {
                width: 50,
                height: 50,
                borderRadius: 5,
                backgroundColor: '#f0f0f0',
                opacity: opacityValue,
              },
            ]}></Animated.View>
          <Animated.View
            style={[
              styles.statistics_item,
              {
                width: 50,
                height: 50,
                borderRadius: 5,
                backgroundColor: '#f0f0f0',
                opacity: opacityValue,
              },
            ]}></Animated.View>
          <Animated.View
            style={[
              styles.statistics_item,
              {
                width: 50,
                height: 50,
                borderRadius: 5,
                backgroundColor: '#f0f0f0',
                opacity: opacityValue,
              },
            ]}></Animated.View>
          <Animated.View
            style={[
              styles.statistics_item,
              {
                width: 50,
                height: 50,
                borderRadius: 5,
                backgroundColor: '#f0f0f0',
                opacity: opacityValue,
              },
            ]}></Animated.View>
        </View>
      </View>
    );
  };
  useEffect(() => {
    if (Object.keys(videoInf).length === 0) {
      setLoading(true);
      anm.current.start();
    } else {
      setLoading(false);
      anm.current.reset();
    }
  }, [videoInf]);

  if (isLoading) {
    return loading();
  }
  return (
    <View style={[styles.video_inf]}>
      <View>
        <View style={[styles.title]}>
          <Text style={[styles.type]}>活动</Text>
          <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.text]}>
            {videoInf.title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            columnGap: 7,
            alignItems: 'center',
            marginTop: 3,
            paddingHorizontal: 4,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>
              <Icon name="instagram" size={13} color="#5f676c" />
            </Text>
            <Text style={{marginLeft: 5, fontSize: 13}}>1231</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>
              <Icon name="comments-o" size={13} color="#5f676c" />
            </Text>
            <Text style={{marginLeft: 5, fontSize: 13}}>1231</Text>
          </View>
          <Text style={{marginLeft: 0, marginTop: -3, fontSize: 13}}>
            {videoInf.createTime}
          </Text>
        </View>
      </View>
      <View style={[styles.statistics]}>
        <Pressable style={[styles.statistics_item]} onPress={like}>
          <Text>
            <Icon
              name="thumbs-up"
              size={22}
              color={videoInf.isLiked ? '#ff679a' : '#5f676c'}
            />
          </Text>
          <Text
            style={[
              videoInf.isLiked && styles.active_text,
              styles.statistics_text,
            ]}>
            {videoInf.likedCount}
          </Text>
        </Pressable>
        <Pressable style={[styles.statistics_item]} onPress={coin}>
          <Text>
            <Icon name="envira" size={22} color="#5f676c" />
          </Text>
          <Text
            style={[
              videoInf.isCoin && styles.active_text,
              styles.statistics_text,
            ]}>
            {videoInf.coinCount}
          </Text>
        </Pressable>
        <Pressable style={[styles.statistics_item]} onPress={collect}>
          <Text>
            <Icon name="star" size={22} color="#5f676c" />
          </Text>
          <Text
            style={[
              videoInf.isCoin && styles.active_text,
              styles.statistics_text,
            ]}>
            {videoInf.collectCount}
          </Text>
        </Pressable>
        <Pressable style={[styles.statistics_item]} onPress={forward}>
          <Text>
            <Icon name="reply-all" size={22} color="#5f676c" />
          </Text>
          <Text style={{fontSize: 12, marginTop: 4}}>
            {videoInf.forwardCount}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  active_text: {
    color: '#ff679a',
  },
  video_inf: {
    marginTop: 22,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  type: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 6,
    flexGrow: 0,
    fontSize: 14,
    backgroundColor: '#f6f7fa',
    color: '#ff679a',
    marginRight: 10,
  },
  text: {
    fontWeight: 700,
    color: '#000',
    flex: 1,
  },
  statistics: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    marginTop: 22,
  },
  statistics_item: {
    alignItems: 'center',
  },
  statistics_text: {
    fontSize: 12,
    marginTop: 4,
  },
});
