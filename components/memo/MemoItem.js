import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  interpolate,
  runOnJS,
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function MemoItem({ index, itemSize, handleClick }) {
  const opened = useSharedValue(false);
  const back = useSharedValue(0);
  const front = useSharedValue(180);

  const backGesture = Gesture.Tap().onEnd(() => {
    if (opened.value) return;
    opened.value = true;
    back.value = withSpring(back.value === 0 ? 180 : 0);
    front.value = withSpring(front.value === 0 ? 180 : 0);
    handleClick(index);
  });

  const styleFront = useAnimatedStyle(() => {
    return {
      backgroundColor: "#EEF2F5",
      transform: [{ perspective: 1500 }, { rotateY: `${front.value}deg` }],
    };
  });
  const styleBack = useAnimatedStyle(() => {
    return {
      backgroundColor: "#2C3941",
      transform: [{ perspective: 1500 }, { rotateY: `${back.value}deg` }],
    };
  });

  return (
    <Animated.View
      style={[{ width: itemSize, height: itemSize }, styles.memoCard]}
      entering={ZoomIn.delay(Math.random() * 700)}
    >
      <Animated.View style={[styles.backAndFront, styleFront]}>
        <Text style={{ color: "#2C3941", fontSize: itemSize / 2 }}>МА</Text>
      </Animated.View>
      <GestureDetector gesture={backGesture}>
        <Animated.View style={[styles.backAndFront, styleBack]}>
          <Text style={{ color: "#EEF2F5", fontSize: itemSize / 2 }}>?</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  memoCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  backAndFront: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
