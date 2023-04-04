import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import {
  Blur,
  Canvas,
  Fill,
  Group,
  RoundedRect,
  Text,
  useFont,
} from "@shopify/react-native-skia";

const { width } = Dimensions.get("window");

const PADDING_HOR = 20;
const PADDING_TOP = 120;
const SIZE = width - PADDING_HOR * 2.2;

export default function SkiaDrawingCards() {
  const fontSize = width / 2;
  const font = useFont(require("../../assets/fontForDrawing.ttf"), fontSize);
  if (font === null) {
    return null;
  }
  return (
    <Canvas style={{ width: SIZE, height: SIZE }}>
      <RoundedRect
        x={0}
        y={0}
        width={SIZE}
        height={SIZE}
        r={10}
        color="#eef2f5"
      />
      <Text x={0} y={width * 0.6} text="МИ" font={font} color="rgba(0,0,0,.3)">
        <Blur blur={9} />
      </Text>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEF2F5",
    width: SIZE,
    height: SIZE,
    borderRadius: 10,
  },
  text: {
    color: "#2C3941",
    fontSize: SIZE - 160,
  },
});
