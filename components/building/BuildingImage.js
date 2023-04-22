import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { Canvas, Fill } from "@shopify/react-native-skia";

export default function BuildingImage() {
  const { width, height } = useWindowDimensions();
  return (
    <Canvas style={{ width: width, height: height * 0.45 }}>
      <Fill color="#01569E" />
    </Canvas>
  );
}

const styles = StyleSheet.create({});
