import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

export default function Card({data}) {
  console.log(data);
  return (
    <Pressable style={styles.card}>
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
          <Text style={{color: '#fff'}}>1:52</Text>
        </View>
      </ImageBackground>
      {/* <Image source={image} style={styles.image} /> */}
      <View style={styles.video_inf}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          textBreakStrategy="simple"
          style={styles.title}>
          {data.title}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 225,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    elevation: 1.5,
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
    height: '37%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    color: '#000',
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
