import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  useCameraDevices,
  Camera as RNVC,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';

export default function Camera() {
  const devices = useCameraDevices();
  const device = devices.back;
  const [data, setData] = useState(0);

  function update() {
    setData(Math.random());
  }

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    // runOnJS(update)();
  }, []);

  if (!device) {
    return (
      <View style={{width: 100, height: 100, backgroundColor: 'red'}}></View>
    );
  }

  return (
    <RNVC
      style={styles.camera}
      device={device}
      isActive={true}
      frameProcessorFps={60}
      frameProcessor={frameProcessor}
    />
  );
}

const styles = StyleSheet.create({
  camera: StyleSheet.absoluteFillObject,
});
