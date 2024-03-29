import {ScrollView, SafeAreaView} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import Author from './introduce/author';
import VideoInf from './introduce/videoInf';
import VideoList from './introduce/videoList';
import Foot from '../../public/Foot';

export default function Introduce({params}) {
  const [videoData, setVideoData] = useState({});
  const [isPullUp, setIsPullUp] = useState(false);
  const scrollViewRef = useRef(null);
  const randomData = () => {
    const nameList = ['哀伤', '都', '和', '是', '就', '怕', '么', '去', '发'];
    let randomName = '';
    let title = '';
    for (let i = 0; i < Math.random() * 10 + 2; i++) {
      const random = Math.floor(Math.random() * nameList.length);
      randomName += nameList[random];
      const randomT = Math.floor(Math.random() * nameList.length);
      title += nameList[randomT];
    }
    return {
      authorInf: {
        name: randomName,
        fans: Math.ceil(Math.random() * 200),
        videoCount: Math.ceil(Math.random() * 200),
        avatar: {uri: 'https://legacy.reactjs.org/logo-og.png'},
        isFollowed: false,
      },
      videoInf: {
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
      },
    };
  };
  useEffect(() => {
    scrollViewRef.current.scrollTo({y: 0, animated: false});
    setVideoData({});
    setTimeout(() => {
      setVideoData(randomData());
    }, 4000);
  }, [params]);
  // 滚动事件
  const getVideoData = event => {
    const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
    const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
    const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
    if (offSetY + oriageScrollHeight >= contentSizeHeight - 1) {
      setIsPullUp(true);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={getVideoData}>
        <Author authorInf={videoData?.authorInf || {}} />
        <VideoInf videoInf={videoData?.videoInf || {}}></VideoInf>
        <VideoList
          params={params}
          isPullUp={isPullUp}
          loadingFinish={() => {
            setIsPullUp(false);
          }}></VideoList>
        <Foot isLoading={isPullUp} />
      </ScrollView>
    </SafeAreaView>
  );
}
