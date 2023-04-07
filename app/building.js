import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function building() {
  const route = useRouter();
  const { width, height } = useWindowDimensions();
  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      offset.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = offset.value.x + translationX;
      translateY.value = offset.value.y + translationY;
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable
        style={{
          ...StyleSheet.absoluteFillObject,
          width: 32,
          height: 32,
          marginLeft: 20,
          marginTop: 40,
        }}
        onPress={() => route.back("/")}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={32}
          color="#EEF2F5"
        />
      </Pressable>
      <MaterialCommunityIcons name="cat" size={width / 2} color="#EEF2F5" />
      <Text
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            { translateX: width / 2 - width / 8 },
            { translateY: height / 2 },
          ],
          color: "#2C3941",
          fontSize: 50,
          fontFamily: "Nunito_500Medium",
          width: width / 4,
          textAlign: "center",
        }}
      >
        _ОТ
      </Text>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.letter, style]}>
          <Animated.Text style={styles.letter_text}>К</Animated.Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01569E",
    justifyContent: "center",
    alignItems: "center",
  },
  letter_text: {
    color: "#EEF2F5",
    fontSize: 50,
    fontFamily: "Nunito_500Medium",
  },
  letter: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
  },
});
