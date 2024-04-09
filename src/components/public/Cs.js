import React, {useState} from 'react';
import {Text, Button, View} from 'react-native';
import {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';

export default function Cs() {
  const [showVideo, setShowVideo] = useState(true);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <OrientationLocker
        orientation={PORTRAIT}
        onChange={orientation => console.log('onChange', orientation)}
        onDeviceChange={orientation =>
          console.log('onDeviceChange', orientation)
        }
      />
      <Button title="Toggle Video" onPress={() => setShowVideo(!showVideo)} />
      {showVideo && (
        <View>
          <OrientationLocker orientation={LANDSCAPE} />
          <View style={{width: 320, height: 180, backgroundColor: '#ccc'}}>
            <Text>Landscape video goes here</Text>
          </View>
        </View>
      )}
    </View>
  );
}
