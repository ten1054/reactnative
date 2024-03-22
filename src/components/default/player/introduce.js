import {View, Text, ScrollView, SafeAreaView, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Author from './introduce/author';
import VideoInf from './introduce/videoInf';
import VideoList from './introduce/videoList';
import Foot from '../../public/Foot';

export default function Introduce() {
  const [allData, setAllData] = useState([]);
  const [isLoading, setLoading] = useState(false);
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
    const number = Math.random() > 0.4 ? 7 : 6;
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
    const newData = reqData();
    console.log('初始化');
    setAllData([...allData, ...newData]);
    console.log('初始化结束');
  }, []);
  const getVideoData = event => {
    const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
    const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
    const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
    if (offSetY + oriageScrollHeight >= contentSizeHeight - 1) {
      setLoading(true);
      const newData = reqData();
      setTimeout(() => {
        setAllData(preValue => {
          setLoading(false);
          return [...preValue, ...newData];
        });
      }, 400);
      return;
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={getVideoData}>
        <Author />
        <VideoInf></VideoInf>
        <VideoList allData={allData}></VideoList>
        <Foot isLoading={isLoading} />
      </ScrollView>
    </SafeAreaView>
  );
}
