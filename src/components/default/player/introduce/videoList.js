import {View, StyleSheet} from 'react-native';
import React from 'react';
import VideoCard from './videoCard';

export default function VideoList({allData}) {
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
});
