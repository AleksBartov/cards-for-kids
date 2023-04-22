import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import {
  Canvas,
  Fill,
  useClockValue,
  useFont,
} from "@shopify/react-native-skia";
import Simbol, { COLUMNS, ROWS, TEXT_MARGIN } from "./Simbol";

export default function BuildingLetters() {
  const { width, height } = useWindowDimensions();
  const font = useFont(
    require("../../assets/fontForDrawing.ttf"),
    (height * 0.55) / ROWS
  );
  const clock = useClockValue();
  const col = new Array(COLUMNS).fill(null).map((_, i) => i);
  const row = new Array(ROWS).fill(null).map((_, i) => i);
  if (font === null) {
    return null;
  }
  return (
    <Canvas style={{ flex: 1, width: width, height: height * 0.55 }}>
      <Fill color="#01569E" />

      {row.map((_, i) => {
        return col.map((__, j) => {
          return (
            <Simbol key={`${i}-${j}`} i={i} j={j} clock={clock} font={font} />
          );
        });
      })}
    </Canvas>
  );
}

const styles = StyleSheet.create({});
