import {StyleSheet, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  useCameraDevices,
  Camera as RNVC,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';

const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function checkPermission() {
      const cameraPermission = await RNVC.getCameraPermissionStatus();
      console.log({cameraPermission});
      if (cameraPermission === 'authorized') {
        setHasPermission(true);
      } else {
        console.log('request', {cameraPermission});
        const status = await RNVC.requestCameraPermission();
        setHasPermission(status === 'authorized');
      }
    }
    checkPermission();
  }, []);

  return hasPermission;
};

export default function Camera() {
  const devices = useCameraDevices();
  const device = devices.back;
  const hasPermission = useCameraPermission();
  const [data, setData] = useState(0);

  function update() {
    setData(Math.random());
  }

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    // runOnJS(update)();
  }, []);

  if (!device || !hasPermission) {
    return <Text>No permission</Text>;
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
