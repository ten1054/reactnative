import {View, Text, TextInput, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NotNormal() {
  const webview = useRef(null);
  const [isShowBack, setIsShowBack] = useState(false);
  const [isValidate, setValidate] = useState(false);
  const back = () => {
    if (webview.current) {
      webview.current.goBack();
    }
  };
  const onNavigationStateChange = navState => {
    if (navState.canGoBack) {
      setIsShowBack(true);
      return;
    }
    setIsShowBack(false);
  };
  useEffect(() => {
    AsyncStorage.getItem('code', (error, res) => {
      if (res && res === 'ggboys') {
        setValidate(true);
      }
    });
  }, []);
  const render = () => {
    if (isValidate) {
      return (
        <View style={{flex: 1}}>
          <WebView
            ref={webview}
            startInLoadingState={true}
            onNavigationStateChange={onNavigationStateChange}
            source={{uri: 'https://www.hacg.mov/wp/anime.html'}}
            style={{flex: 1}}></WebView>
          {isShowBack && (
            <Pressable
              style={{
                flexDirection: 'row',
                position: 'absolute',
                top: 10,
                left: 10,
                alignItems: 'center',
                columnGap: 5,
                backgroundColor: '#fbfbfd',
                borderRadius: 5,
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}
              onPress={back}>
              <Icon name="angle-left" size={30} color="#f55c9b" />
              <Text style={{color: '#f55c9b'}}>返回</Text>
            </Pressable>
          )}
        </View>
      );
    }
    return (
      <View>
        <Text>请验证</Text>
      </View>
    );
  };
  return render();
}
