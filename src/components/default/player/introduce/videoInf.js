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

export default function VideoInf({params}) {
  const [videoData, setVideoData] = useState({});
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
  const getRandomData = () => {
    const nameList = ['哀伤', '都', '和', '是', '就', '怕', '么', '去', '发'];
    let title = '';
    for (let i = 0; i < Math.random() * 10 + 2; i++) {
      const random = Math.floor(Math.random() * nameList.length);
      title += nameList[random];
    }
    setVideoData({
      title,
      playerCount: Math.ceil(Math.random() * 200),
      commentLength: Math.ceil(Math.random() * 200),
      createTime: '2024年3月21日05:34',
      likedCount: Math.ceil(Math.random() * 200),
      coinCount: Math.ceil(Math.random() * 200),
      collectCount: Math.ceil(Math.random() * 200),
      forwardCount: Math.ceil(Math.random() * 200),
      isLiked: false,
      isCoin: false,
      isCollect: false,
    });
  };
  const like = () => {
    setVideoData({
      ...videoData,
      isLiked: !videoData.isLiked,
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
    setLoading(true);
    anm.current.start();
    setTimeout(() => {
      getRandomData();
      setLoading(false);
      anm.current.reset();
    }, 4000);
  }, [params]);

  if (isLoading) {
    return loading();
  }
  return (
    <View style={[styles.video_inf]}>
      <View>
        <View style={[styles.title]}>
          <Text style={[styles.type]}>活动</Text>
          <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.text]}>
            {videoData.title}
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
            {videoData.createTime}
          </Text>
        </View>
      </View>
      <View style={[styles.statistics]}>
        <Pressable style={[styles.statistics_item]} onPress={like}>
          <Text>
            <Icon
              name="thumbs-up"
              size={22}
              color={videoData.isLiked ? '#ff679a' : '#5f676c'}
            />
          </Text>
          <Text
            style={[
              videoData.isLiked && styles.active_text,
              styles.statistics_text,
            ]}>
            {videoData.likedCount}
          </Text>
        </Pressable>
        <Pressable style={[styles.statistics_item]} onPress={coin}>
          <Text>
            <Icon name="envira" size={22} color="#5f676c" />
          </Text>
          <Text
            style={[
              videoData.isCoin && styles.active_text,
              styles.statistics_text,
            ]}>
            {videoData.coinCount}
          </Text>
        </Pressable>
        <Pressable style={[styles.statistics_item]} onPress={collect}>
          <Text>
            <Icon name="star" size={22} color="#5f676c" />
          </Text>
          <Text
            style={[
              videoData.isCoin && styles.active_text,
              styles.statistics_text,
            ]}>
            {videoData.collectCount}
          </Text>
        </Pressable>
        <Pressable style={[styles.statistics_item]} onPress={forward}>
          <Text>
            <Icon name="reply-all" size={22} color="#5f676c" />
          </Text>
          <Text style={{fontSize: 12, marginTop: 4}}>
            {videoData.forwardCount}
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
