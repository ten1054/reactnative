import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  Text,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Easing} from 'react-native-animatable';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const Cs = () => {
  const [isFocus, setFocus] = useState(false);
  const leftMenu = useRef(null);
  const midContent = useRef(null);
  // const leftPan = useRef(new Animated.ValueXY({x: 20, y: 0.8}));
  const [leftPan, setLeftPan] = useState({x: 20, y: 0.8});
  const [midPan, serMidPan] = useState({x: 0, y: 1});
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      // 开始手势了
      onPanResponderGrant: () => {
        setFocus(true);
      },
      //手机开始移动
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0) {
          const value = getLeftAnmValue(gestureState.dx);
          setLeftPan(value);
          const midValue = getRightAnmValue(gestureState.dx);
          serMidPan(midValue);
        }
      },
      // 手势释放了
      onPanResponderRelease: (evt, gestureState) => {
        setFocus(false);
        if (leftPan.y > 0.9) {
          console.log('展开');
        } else {
          console.log('关闭');
        }

        // if (gestureState.dx > 0) {
        //   leftMenu.current.animate({
        //     from: {translateX: 20, scale: 0.8},
        //     to: {translateX: 0, scale: 1},
        //     duration: 30,
        //     useNativeDriver: true,
        //   });
        //   midContent.current.animate({
        //     from: {translateX: 0, scale: 1},
        //     to: {translateX: deviceWidth - 100, scale: 0.9},
        //     duration: 30,
        //     useNativeDriver: true,
        //   });
        //   setLeft(() => true);
        // } else if (gestureState.dx < 0) {
        //   leftMenu.current.animate({
        //     from: {translateX: 0, scale: 1},
        //     to: {translateX: 20, scale: 0.8},
        //     duration: 30,
        //     useNativeDriver: true,
        //   });
        //   midContent.current.animate({
        //     from: {translateX: deviceWidth - 100, scale: 0.9},
        //     to: {translateX: 0, scale: 1},
        //     duration: 30,
        //     useNativeDriver: true,
        //   });
        //   setLeft(() => false);
        // }
      },
    }),
  ).current;

  const getLeftAnmValue = diff => {
    let x = 20 - 20 * diff * 0.01;
    let y = 0.8 + 0.2 * diff * 0.01;
    x <= 0 && (x = 0);
    y >= 1 && (y = 1);
    return {
      x,
      y,
    };
  };
  const getRightAnmValue = diff => {
    let x = 0 + (deviceWidth - 100) * diff * 0.01;
    let y = 1 - 0.1 * diff * 0.01;
    x >= deviceWidth - 100 && (x = deviceWidth - 100);
    y <= 0.9 && (y = 0.9);
    return {
      x,
      y,
    };
  };
  return (
    <View style={[styles.container, isFocus && styles.focus]}>
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Animatable.View
          ref={leftMenu}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            paddingRight: 100,
            backgroundColor: 'transparent',
            transform: [{translateX: leftPan.x}, {scale: leftPan.y}],
          }}>
          <Text>
            x: {leftPan.x}
            y: {leftPan.y}
          </Text>

          <Text>
            {leftPan.x}
            {leftPan.y}
          </Text>
          <Text>
            {leftPan.x}
            {leftPan.y}
          </Text>
          <Text>
            {leftPan.x}
            {leftPan.y}
          </Text>
          <Text>
            {leftPan.x}
            {leftPan.y}
          </Text>
          <Text>
            {leftPan.x}
            {leftPan.y}
          </Text>
          <Text>
            {leftPan.x}
            {leftPan.y}
          </Text>
          <Text>
            {leftPan.x}
            {leftPan.y}
          </Text>
        </Animatable.View>
        <Animatable.View
          ref={midContent}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#c8c9ca',
            borderRadius: 10,
            transform: [{translateX: midPan.x}, {scale: midPan.y}],
          }}>
          <View
            style={{width: 30, height: '100%', backgroundColor: '#000'}}
            {...panResponder.panHandlers}></View>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  focus: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  container: {
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default Cs;
