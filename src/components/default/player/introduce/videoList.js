import {View, StyleSheet, Animated, Easing} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import VideoCard from './videoCard';

export default function VideoList({allData, params}) {
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
  useEffect(() => {
    setLoading(true);
    anm.current.start();
    setTimeout(() => {
      setLoading(false);
      anm.current.reset();
    }, 4000);
  }, [params]);

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
