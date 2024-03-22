import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, Easing, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Foot({isLoading}) {
  const degValue = useRef(new Animated.Value(0)).current;
  const anm = useRef(null);
  const deg = degValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    anm.current = Animated.loop(
      Animated.timing(degValue, {
        toValue: 360,
        easing: Easing.linear,
        duration: 1000,
        useNativeDriver: true,
      }),
    );
  }, []);
  useEffect(() => {
    if (!isLoading) {
      anm.current && anm.current.reset();
    } else {
      anm.current && anm.current.start();
    }
  }, [isLoading]);

  return (
    <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
      {isLoading && (
        <Animated.View style={[styles.loading, {transform: [{rotate: deg}]}]}>
          <Icon name="rotate-right" size={15} color="#9f9f9f" />
        </Animated.View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  loading: {
    width: 25,
    height: 25,
    borderRadius: 200,
    backgroundColor: '#FDFDFD',
    elevation: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
