import {View, StyleSheet, Animated, Easing} from 'react-native';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import VideoCard from './videoCard';

export default function VideoList({isPullUp, loadingFinish, params}) {
  const [allData, setAllData] = useState([]);
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
  const loading = () => {
    return (
      <View style={[styles.card_container]}>
        {new Array(10).fill(0).map((x, i) => {
          return (
            <View key={i} style={[styles.card]}>
              <Animated.View
                style={[
                  styles.card_img_loading,
                  {opacity: opacityValue},
                ]}></Animated.View>
              <View style={{rowGap: 5, width: '100%'}}>
                <Animated.View
                  style={[
                    styles.card_img_loading,
                    {width: '50%', height: 20, opacity: opacityValue},
                  ]}></Animated.View>
                <Animated.View
                  style={[
                    styles.card_img_loading,
                    {width: '20%', height: 20, opacity: opacityValue},
                  ]}></Animated.View>
                <Animated.View
                  style={[
                    styles.card_img_loading,
                    {width: '20%', height: 20, opacity: opacityValue},
                  ]}></Animated.View>
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  const reqData = useCallback(() => {
    const randomTitle = [
      '我',
      '是',
      '无',
      '敌',
      '的',
      '没',
      '没用',
      '人',
      '能',
      '阴',
      '我',
    ];
    const data = [];
    const number = Math.random() > 0.4 ? 3 : 4;
    for (let i = 0; i < number; i++) {
      const randomNumber = Math.floor(Math.random() * 10 + 10);
      let str = '';
      for (let j = 0; j < randomNumber; j++) {
        const randomIndex = Math.floor(Math.random() * randomTitle.length);
        str += randomTitle[randomIndex];
      }
      data.push({
        id: i + Math.random() * 1000,
        title: str,
        author: str.slice(0, 5),
        playerCount: Math.floor(Math.random() * 500),
        commentCount: Math.floor(Math.random() * 500),
      });
    }
    return data;
  }, []);

  useEffect(() => {
    setAllData([]);
    setLoading(true);
    anm.current.start();
    setTimeout(() => {
      setLoading(false);
      const newData = reqData();
      setAllData(preValue => {
        return [...preValue, ...newData];
      });
      anm.current.reset();
    }, 2000);
  }, [params]);

  useEffect(() => {
    if (isPullUp) {
      const newData = reqData();
      setTimeout(() => {
        setAllData(preValue => {
          return [...preValue, ...newData];
        });
        loadingFinish();
      }, 2000);
    }
  }, [isPullUp]);

  if (isLoading) {
    return loading();
  }
  return (
    <View style={[styles.card_container]}>
      {allData.map(x => {
        return <VideoCard key={x.id} card={x}></VideoCard>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card_container: {
    rowGap: 10,
    marginTop: 20,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  card_img_loading: {
    width: 130,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
});
