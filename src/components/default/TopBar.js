import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TopBar() {
  const [value, onChangeText] = useState('');
  return (
    <View style={[styles.topBar]}>
      <View style={[styles.left]}>
        <View style={[styles.avatar]}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../assets/images/hh.webp')}
          />
        </View>
        <TextInput
          style={[styles.searchText]}
          placeholder="搜索"
          allowFontScaling={true}
          inlineImageLeft="hh.webp"
          clearButtonMode="always"
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      </View>
      <View style={[styles.right]}>
        <Text>
          <Icon name="wpexplorer" size={22} color="#6c6d71" />
        </Text>
        <Text>
          <Icon name="envelope-o" size={22} color="#6c6d71" />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20,
  },
  left: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 200,
    marginRight: 20,
    overflow: 'hidden',
  },
  searchText: {
    width: 220,
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
  },
  right: {
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'space-between',
    width: 60,
  },
});
