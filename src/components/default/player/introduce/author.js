import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Author() {
  const [authorInf, setAuthorInf] = useState({
    name: '无敌的小蘑菇',
    fans: 212,
    videoCount: 43,
    avatar: {uri: 'https://legacy.reactjs.org/logo-og.png'},
    isFollowed: false,
  });

  const followAuthor = () => {
    setAuthorInf({
      ...authorInf,
      isFollowed: !authorInf.isFollowed,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ImageBackground
          source={authorInf.avatar}
          resizeMode="cover"
          style={styles.image}></ImageBackground>
        <View style={{marginLeft: 15, justifyContent: 'center'}}>
          <Text style={{color: '#ff679a'}}>{authorInf.name}</Text>
          <View style={{flexDirection: 'row', columnGap: 15}}>
            <Text style={{fontSize: 12}}>{authorInf.fans}粉丝</Text>
            <Text style={{fontSize: 12}}>{authorInf.videoCount}视频</Text>
          </View>
        </View>
      </View>
      <Pressable
        style={[
          authorInf.isFollowed ? styles.followed : styles.no_followed,
          styles.follower_button,
        ]}
        onPress={followAuthor}>
        <Text>
          <Icon name="plus" size={13} color="#fff" />
        </Text>
        <Text style={{marginLeft: 5, marginTop: -4, color: '#fff'}}>
          {' '}
          {authorInf.isFollowed ? '已关注' : '关注'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    overflow: 'hidden',
  },
});
