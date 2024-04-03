import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDMList} from '../../../../serve/home';
import Foot from '../../../public/Foot';
import {useNavigation} from '@react-navigation/native';

export default function () {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingFoot, setFootLoading] = useState(false);
  const openVideo = inf => {
    navigation.navigate('DmPlayer', {
      id: inf.videoPage,
      number: 1,
    });
  };
  useEffect(() => {
    alert('开始');
    setFootLoading(true);
    getDMList(page + 1, res => {
      setData([...data, ...res]);
      alert(res[0]?.title);
      setFootLoading(false);
      setPage(page + 1);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        ItemSeparatorComponent={<View style={{height: 10}} />}
        renderItem={render => {
          const img = {uri: render.item.src};
          return (
            <Pressable
              style={styles.card}
              onPress={() => {
                openVideo(render.item);
              }}>
              <View>
                <Image style={styles.image} source={img} />
                <Text style={styles.bg_text}>{render.item.latest}</Text>
              </View>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{marginTop: 5}}>
                {render.item.title}
              </Text>
            </Pressable>
          );
        }}
        keyExtractor={item => item.title}
        onEndReachedThreshold={0.01}
        onEndReached={info => {
          setFootLoading(true);
          getDMList(page + 1, res => {
            setData([...data, ...res]);
            setFootLoading(false);
            setPage(page + 1);
          });
        }}
        ListFooterComponent={<Foot isLoading={loadingFoot} />}></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    padding: 5,
  },
  card: {
    width: '31%',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  bg_text: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 12,
    color: 'red',
  },
});
