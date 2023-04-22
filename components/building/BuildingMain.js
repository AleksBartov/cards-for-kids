import { StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import BuildingImage from "./BuildingImage";
import BuildingLetters from "./BuildingLetters";
import Animated, {
  FadeInUp,
  ZoomInEasyUp,
  ZoomInUp,
} from "react-native-reanimated";

export default function BuildingMain() {
  const { width: _width, height: _height } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        width: _width,
        height: _height,
      }}
    >
      <View
        style={{
          width: _width,
          height: _height * 0.45,
        }}
      >
        <BuildingImage />
      </View>
      <Animated.View
        entering={ZoomInEasyUp}
        style={{
          width: _width,
          height: _height * 0.55,
        }}
      >
        <BuildingLetters />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({});
