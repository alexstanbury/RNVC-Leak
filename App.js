/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import Camera from './Camera';

const App = () => {
  const [cameraVisible, setCameraVisible] = useState(false);

  const toggle = useCallback(() => {
    setCameraVisible(v => !v);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          bottom: 0,
          width: 100,
          height: 200,
        }}>
        <SafeAreaView />
        <Button title="TOGGLE CAMERA" onPress={toggle}></Button>
      </View>
      {cameraVisible && <Camera />}
    </View>
  );
};

export default App;
