import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { Rect } from "@shopify/react-native-skia";

export const COLUMNS = 8;
export const ROWS = 8;

export default function Simbol({ i, j }) {
  const { width, height } = useWindowDimensions();
  const thisHeight = height * 0.55;
  const x = j * (width / COLUMNS);
  const y = i * (thisHeight / ROWS);
  return (
    <Rect
      x={x}
      y={y}
      width={width / COLUMNS}
      height={thisHeight / ROWS}
      color={j % 2 === 0 ? "white" : "red"}
    />
  );
}

const styles = StyleSheet.create({});
