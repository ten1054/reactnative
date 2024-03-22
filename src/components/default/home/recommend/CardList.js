import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Card from './Card';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CardList({data, index, showTip, onPress}) {
  return (
    <View style={[styles.videoData]}>
      {index === 1 && showTip && (
        <View
          style={{
            width: '100%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
            }}
            onPress={() => {
              onPress();
            }}>
            <Text style={{color: '#f55c9b'}}>你上次看到这里,点击刷新</Text>
            <Icon
              name="rotate-right"
              style={{marginLeft: 5, marginTop: 4}}
              size={13}
              color="#f55c9b"
            />
          </TouchableOpacity>
        </View>
      )}
      {data.map((x, i) => {
        return <Card key={x.id} length={data.length} index={i} data={x}></Card>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  videoData: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
});
