import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Foot from '../components/public/Foot';
import {getSearchList} from '../serve/home';

export default function ({navigation}) {
  const [value, onChangeText] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [loadingNew, setLoadingNew] = useState(false);
  const [loadingFoot, setFootLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const back = () => {
    navigation.goBack();
  };
  const submit = () => {
    setSearchValue(value);
    setLoadingNew(true);
    getSearchList(value, 0, (state, res) => {
      if (state) {
        setData(res);
        setLoadingNew(false);
        setPage(1);
        return;
      }
      setLoadingNew(false);
    });
  };
  const openVideo = inf => {
    navigation.navigate('DmPlayer', {
      id: inf.videoPage,
      number: 1,
    });
  };
  const renderSearchList = () => {
    if (loadingNew) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Foot isLoading={true} />
          <Text>搜索中</Text>
        </View>
      );
    }
    if (data.length === 0) {
      return <Text>未搜索到内容</Text>;
    }
    return (
      <SafeAreaView style={styles.content}>
        <FlatList
          data={data}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={<View style={{height: 10}} />}
          renderItem={render => {
            const img = {uri: render.item.src};
            return (
              <Pressable
                style={styles.card}
                onPress={() => {
                  openVideo(render.item);
                }}>
                <Image style={styles.image} source={img} />
                <View style={{flex: 1, marginLeft: 10, rowGap: 5}}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={{marginTop: 5, color: '#000', fontWeight: 700}}>
                    {render.item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                    }}
                    numberOfLines={4}
                    ellipsizeMode={'tail'}
                    textBreakStrategy={'simple'}>
                    {render.item.describe}
                  </Text>
                  <Text style={styles.bg_text}>{render.item.latest}</Text>
                </View>
              </Pressable>
            );
          }}
          keyExtractor={item => item.title}
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            setFootLoading(true);
            getSearchList(searchValue, page + 1, (state, res) => {
              if (state) {
                setData([...data, ...res]);
                setFootLoading(false);
                setPage(page + 1);
                return;
              }
              setFootLoading(false);
            });
          }}
          ListFooterComponent={<Foot isLoading={loadingFoot} />}></FlatList>
      </SafeAreaView>
    );
  };
  return (
    <View style={styles.search_page}>
      <View style={[styles.head]}>
        <Text onPress={back}>
          <Icon name="angle-left" size={22} color="#6c6d71" />
        </Text>
        <TextInput
          style={[styles.searchText]}
          placeholder="搜索"
          allowFontScaling={true}
          inlineImageLeft="logo.jpg"
          clearButtonMode="always"
          onSubmitEditing={submit}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      </View>
      <View style={styles.content}>{renderSearchList()}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  search_page: {
    paddingTop: 5,
    flex: 1,
  },
  head: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 30,
    borderBottomColor: '#00000085',
    borderBottomWidth: 1,
  },
  searchText: {
    flex: 1,
    marginLeft: 20,
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 130,
    borderRadius: 5,
  },
  bg_text: {
    fontSize: 12,
    color: 'red',
  },
});
