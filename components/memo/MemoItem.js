import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  SlideInLeft,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";

export default function MemoItem({ index, itemSize }) {
  return (
    <Animated.View
      style={[{ width: itemSize, height: itemSize }, styles.memoCard]}
      entering={
        index % 2 === 0
          ? SlideInRight.delay(index * 60)
          : SlideInLeft.delay(index * 60)
      }
    >
      <Text style={{ color: "#EEF2F5", fontSize: 24 }}>?</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  memoCard: {
    backgroundColor: "#2C3941",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
