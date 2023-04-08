import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function RightAnswer({ text }) {
  const { height, width } = useWindowDimensions();
  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(
    width / 2 - Math.floor((Math.random() * width) / 1.5)
  );
  const translateY = useSharedValue(
    Math.floor(Math.random() * (height / 4) + 100)
  );
  const color = useSharedValue("#EEF2F5");

  const gesture = Gesture.Pan()
    .onBegin(() => {
      offset.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = translationX + offset.value.x;
      translateY.value = translationY + offset.value.y;
    })
    .onEnd(({ velocityX, velocityY }) => {
      translateX.value = withSpring(0, { velocity: velocityX });
      translateY.value = withSpring(0, { velocity: velocityY });
    });
  const style = useAnimatedStyle(() => {
    return {
      color: color.value,
      transform: [
        {
          translateX: translateX.value,
        },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.Text style={[styles.text, style]}>{text}</Animated.Text>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 65,
    fontFamily: "Nunito_500Medium",
  },
});
