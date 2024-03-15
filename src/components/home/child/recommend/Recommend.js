import {StyleSheet, FlatList, View} from 'react-native';

import React from 'react';
import Card from './Card';
import Foot from './Foot';

export default function () {
  const data = [];
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
  for (let i = 0; i < 20; i++) {
    const randomNumber = Math.floor(Math.random() * 10 + 10);
    let str = '';
    for (let j = 0; j < randomNumber; j++) {
      const randommIndex = Math.floor(Math.random() * randomTitle.length);
      str += randomTitle[randommIndex];
    }
    data.push({
      id: i,
      title: str,
    });
  }
  return (
    <FlatList
      data={data}
      columnWrapperStyle={{columnGap: 10}}
      numColumns={2}
      renderItem={render => <Card data={render.item}></Card>}
      keyExtractor={item => item.id}
      refreshing={true}
      ListFooterComponent={<Foot />}
      showsVerticalScrollIndicator={false}></FlatList>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    rowGap: 5,
    columnGap: 5,
  },
});
