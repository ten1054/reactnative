import {
  View,
  StatusBar,
  Text,
  Animated,
  StyleSheet,
  Easing,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation-locker';
import {changeTimeUnit} from '../../utils/Public';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

export default function VideoPlayer({uri}) {
  //获取设备的宽度和高度

  const [isPaused, setPaused] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [dur, setDuration] = useState(false);
  const [full, setFull] = useState(false);
  const [isShowControl, setShowControl] = useState(true);
  const yValue = useRef(new Animated.Value(100)).current;
  const [timer, setTimer] = useState(null);
  const [isDoubleTapped, setIsDoubleTapped] = useState(false);
  const [lastPressTime, setPressTime] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);
  const videoRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (isShowControl) {
      Animated.timing(yValue, {
        toValue: 0,
        easing: Easing.out(Easing.exp),
        duration: 400,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          const timer = setTimeout(() => {
            setShowControl(() => {
              Animated.timing(yValue, {
                toValue: 100,
                easing: Easing.out(Easing.exp),
                duration: 2000,
                useNativeDriver: true,
              }).start();
              return false;
            });
          }, 4000);
          setTimer(timer);
        }
      });
    }
  }, [isShowControl]);

  const changeTime = ({currentTime}) => {
    setCurrentTime(currentTime);
    setPercentage((currentTime * 100) / dur.duration);
  };
  const fullPlay = () => {
    changeShowControl();
    setFull(pre => {
      if (!pre) {
        Orientation.lockToLandscapeLeft();
      } else {
        Orientation.lockToPortrait();
      }
      return !pre;
    });
  };
  const handleVideoPress = () => {
    if (Date.now() - lastPressTime <= 300 && isDoubleTapped) {
      clearTimeout(clickTimer);
      setClickTimer(null);
      setPaused(!isPaused);
      setIsDoubleTapped(false);
      setPressTime(0);
      return;
    }
    setIsDoubleTapped(true);
    setPressTime(Date.now());
    const timer = setTimeout(() => {
      changeShowControl();
      setIsDoubleTapped(false);
      setPressTime(0);
      clearTimeout(clickTimer);
      setClickTimer(null);
    }, 300);
    setClickTimer(timer);
  };
  const changeShowControl = () => {
    clearTimeout(timer);
    if (!isShowControl) {
      setShowControl(true);
    } else {
      const timer = setTimeout(() => {
        setShowControl(() => {
          Animated.timing(yValue, {
            toValue: 100,
            easing: Easing.out(Easing.exp),
            duration: 2000,
            useNativeDriver: true,
          }).start();
          return false;
        });
      }, 4000);
      setTimer(timer);
    }
  };
  const handleLayout = event => {
    const {width: layoutWidth} = event.nativeEvent.layout;
    setBarWidth(layoutWidth);
  };
  const fastForward = event => {
    const {locationX} = event.nativeEvent;
    const timeInSeconds = (locationX * dur.duration) / barWidth;
    setPercentage((locationX * 100) / barWidth);
    if (videoRef.current) {
      videoRef.current.seek(timeInSeconds);
    }
    changeShowControl();
  };

  return (
    <View
      style={[
        full ? styles.full_screen : styles.normal_screen,
        {
          position: 'relative',
          overflow: 'hidden',
        },
      ]}>
      <StatusBar hidden={full} />
      <Video
        ref={videoRef}
        style={[styles.video]}
        source={{
          uri,
        }}
        resizeMode={'cover'}
        paused={isPaused}
        onEnd={() => {}}
        onProgress={changeTime}
        onLoad={data => setDuration(data)}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        onPress={handleVideoPress}>
        <Animated.View
          style={[styles.video_control, {transform: [{translateY: yValue}]}]}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              height: 5,
              width: '97%',
            }}
            onPress={fastForward}>
            <View
              onLayout={handleLayout}
              style={{
                height: 5,
                width: '100%',
                backgroundColor: '#ededf050',
                borderRadius: 1,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  backgroundColor: '#FF80B5',
                  height: '100%',
                  width: percentage + '%',
                  borderRadius: 0,
                }}></View>
            </View>
          </TouchableOpacity>
          <View style={styles.option}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {isPaused ? (
                <Text
                  onPress={() => {
                    changeShowControl();
                    setPaused(!isPaused);
                  }}>
                  <Icon name="play" size={15} color="#FFF" />
                </Text>
              ) : (
                <Text
                  onPress={() => {
                    changeShowControl();
                    setPaused(!isPaused);
                  }}>
                  <Icon name="pause" size={15} color="#FFF" />
                </Text>
              )}
              <View
                style={{flexDirection: 'row', columnGap: 5, marginLeft: 10}}>
                <Text style={{fontSize: 10, color: '#fff'}}>
                  {changeTimeUnit(currentTime)} /
                </Text>
                <Text style={{fontSize: 10, color: '#fff'}}>
                  {changeTimeUnit(dur.duration)}
                </Text>
              </View>
            </View>
            <View>
              <Text onPress={fullPlay}>
                <Icon name="expand" size={15} color="#FFF" />
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  full_screen: {
    height: '100%',
    width: '100%',
  },
  normal_screen: {
    width: deviceWidth,
    height: deviceWidth * (9 / 16),
  },
  rotate: {
    transform: [{rotate: '90deg'}],
  },
  video: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  video_control: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#00000070',
    paddingVertical: 10,
  },
  option: {
    width: '95%',
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    color: '#fff',
    fontSize: 10,
  },
});
