import {View, Text, Pressable, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ({state, descriptors, navigation}) {
  const list = [
    {
      name: '首页',
      icon: 'shield',
    },
    {
      name: '设置',
      icon: 'cube',
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
      }}>
      {list.map((item, index) => {
        const route = state.routes[index];
        const checkTab = () => {
          navigation.navigate(route.name, route.params);
        };

        return (
          <Pressable
            key={index}
            onPress={checkTab}
            style={[
              styles.normal_press,
              state.index === index && styles.active,
            ]}>
            <Icon
              name={item.icon}
              size={20}
              style={[state.index === index && styles.active]}
            />
            <Text
              style={[
                styles.normal_text,
                state.index === index && styles.active,
              ]}>
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  normal_press: {
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 3,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    color: '#f55c9b',
  },
  normal_text: {
    fontSize: 10,
    color: '#000',
  },
});
