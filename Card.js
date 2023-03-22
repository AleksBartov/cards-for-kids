import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Audio } from "expo-av";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ReText, snapPoint } from "react-native-redash";

const { width, height } = Dimensions.get("window");

const SNAP_POINTS = [-width, 0, width];
const CARD_WIDTH = width * 0.6;
const CARD_HEIGHT = CARD_WIDTH * 1.614;
const BORDER_PADDING = 6;
const DURATION = 250;

export default function Card({ textArray, index, shuffleBack }) {
  const [recording, setRecording] = useState();

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }

  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-height);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const rotateX = useSharedValue(30);
  const delay = index * DURATION;
  const theta = -10 + Math.random() * 20;
  const step = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: DURATION, easing: Easing.inOut(Easing.ease) })
    );
    rotateZ.value = withDelay(delay, withSpring(theta));
  }, [translateY, theta, index, rotateZ, delay]);

  useAnimatedReaction(
    () => shuffleBack.value,
    (v) => {
      if (v) {
        const duration = 150 * index;
        translateX.value = withDelay(
          duration,
          withSpring(0, {}, () => {
            shuffleBack.value = false;
          })
        );
        rotateZ.value = withDelay(duration, withSpring(theta));
      }
    }
  );

  const gesture = Gesture.Pan()
    .onBegin(() => {
      offset.value = { x: translateX.value, y: translateY.value };
      rotateX.value = withTiming(0);
      rotateZ.value = withTiming(0);
      scale.value = withTiming(1.1);
      // runOnJS(startRecording)();
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = offset.value.x + translationX;
      translateY.value = offset.value.y + translationY;
    })
    .onEnd(({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      translateY.value = withSpring(0, { velocity: velocityY });
      rotateX.value = withTiming(30);
      scale.value = withTiming(1, {}, () => {
        const isLast = index === 0;
        const isSwaptLeftOrRight = dest !== 0;
        if (isSwaptLeftOrRight) {
          step.value === textArray.length ? (step.value = 0) : step.value++;
        }
        if (isLast && isSwaptLeftOrRight) {
          shuffleBack.value = true;
        }
      });
      // runOnJS(stopRecording)();
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1500 },
      { rotateX: `${rotateX.value}deg` },
      { rotateZ: `${rotateZ.value}deg` },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const date = useDerivedValue(() => {
    const d = textArray[step.value];
    return d;
  });

  return (
    <View style={styles.box} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card_container, style]}>
          <View style={styles.card_inner_border}>
            <ReText style={styles.card_text} text={date} />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  card_container: {
    backgroundColor: "#EEF2F5",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card_inner_border: {
    backgroundColor: "#EEF2F5",
    width: CARD_WIDTH - BORDER_PADDING,
    height: CARD_HEIGHT - BORDER_PADDING,
    borderRadius: 10,
    borderColor: "#2C3941",
    borderWidth: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  card_text: {
    color: "#2C3941",
    fontSize: CARD_WIDTH - 130,
  },
});
