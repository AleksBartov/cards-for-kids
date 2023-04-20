import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { Rect, Text, useComputedValue } from "@shopify/react-native-skia";
import { createNoise3D } from "simplex-noise";

const LETTERS = ["А", "М", "Р", "О", "У", "Б"];

export const COLUMNS = 3;
export const ROWS = 5;

export default function Simbol({ i, j, clock, font }) {
  const { width, height } = useWindowDimensions();
  const noise = createNoise3D();
  const thisHeight = height * 0.55;
  const x = j * (width / COLUMNS);
  const y = i * (thisHeight / ROWS);
  const text = LETTERS[Math.round(Math.random() * (LETTERS.length - 1))];
  return <Text text={text} font={font} x={x} y={y} color="blue" />;
}

const styles = StyleSheet.create({});
