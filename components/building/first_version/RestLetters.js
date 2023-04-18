import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function RestLetters({ text, changeColor }) {
  const style = useAnimatedStyle(() => {
    return {
      color: changeColor.value ? "#EEF2F5" : "#2C3941",
    };
  });
  return (
    <Animated.Text
      style={[
        {
          fontSize: 65,
          fontFamily: "Nunito_500Medium",
        },
        style,
      ]}
    >
      {text}
    </Animated.Text>
  );
}
