import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function VideoInf() {
  const [videoData, setVideoData] = useState({
    title: '[暗黑四]篝火访谈S4最新海量内容曝光，内涵最新血点激活码',
    playerCount: 0,
    commentLength: 65,
    createTime: '2024年3月21日05:34',
    likedCount: 5423,
    coinCount: 150,
    collectCount: 54,
    forwardCount: 72,
    isLiked: false,
    isCoin: false,
    isCollect: false,
  });
  const like = () => {
    setVideoData({
      ...videoData,
      isLiked: !videoData.isLiked,
    });
  };
  const coin = () => {};
  const collect = () => {};
  const forward = () => {};
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
