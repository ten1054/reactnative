import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cs from '../../components/public/Cs';

export default function ({navigation}) {
  const [value, onChangeText] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('code', (error, res) => {
      if (res) {
        onChangeText(res);
      }
    });
  }, []);

  const saveCode = function () {
    AsyncStorage.setItem('code', value, err => {
      if (!err) {
        alert('设置成功');
      }
    });
  };
  return (
    <View style={{flex: 1, padding: 10}}>
      <View>
        <Text>该app仅用于个人学习与交流或个人欣赏用途(禁转发搬运/禁商用)</Text>
        <Text>暂时还没有内容!,有事请发送邮件至2474006184@qq.com</Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          columnGap: 10,
          alignItems: 'center',
        }}>
        <TextInput
          style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder={'验证密码'}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <Pressable
          style={{
            backgroundColor: '#659d5a',
            height: 40,
            paddingHorizontal: 10,
            alignItems: 'center',
            borderRadius: 2,
            justifyContent: 'center',
          }}
          onPress={saveCode}>
          <Text style={{color: '#fff'}}>确认</Text>
        </Pressable>
      </View>
      <Cs></Cs>
    </View>
  );
}
