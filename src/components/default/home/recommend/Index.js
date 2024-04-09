import {StyleSheet, FlatList, View, Text} from 'react-native';
import {useRef, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardList from './CardList';
import Foot from '../../../public/Foot';

function getVideoData() {
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
      time: new Date().getSeconds(),
    });
  }
  return data;
}

export default function () {
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [refreshData, setRefreshData] = useState([]);
  const flagListRef = useRef(null);
  useEffect(() => {
    const extraData = getVideoData();
    setRefreshData([extraData]);
  }, []);
  const refresh = function () {
    setShowTip(true);
    setRefresh(true);
    setTimeout(() => {
      const extraData = getVideoData();
      const newData = [extraData, refreshData[0]];
      setRefreshData(newData);
      setRefresh(false);
      flagListRef.current.scrollToOffset({offset: 0, animated: false});
    }, 200);
  };
  return (
    <>
      <FlatList
        ref={flagListRef}
        data={refreshData}
        ItemSeparatorComponent={<View style={{height: 10}} />}
        renderItem={render => (
          <CardList
            data={render.item}
            index={render.index}
            showTip={showTip}
            onPress={refresh}></CardList>
        )}
        keyExtractor={(item, index) => index}
        refreshing={isRefresh}
        onRefresh={refresh}
        onEndReachedThreshold={0.01}
        onEndReached={info => {
          setLoading(true);
          setTimeout(() => {
            const newData = getVideoData();
            setRefreshData([...refreshData, newData]);
            setLoading(false);
          }, 2000);
        }}
        ListFooterComponent={<Foot isLoading={isLoading} />}
        showsVerticalScrollIndicator={false}></FlatList>
    </>
  );
}
const styles = StyleSheet.create({
  back_top: {
    position: 'absolute',
    left: '92%',
    bottom: '2%',
    zIndex: 2,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 500,
    backgroundColor: '#FDFDFD',
    elevation: 1.5,
  },
});
