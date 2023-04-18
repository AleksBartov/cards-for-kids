import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { Canvas, Fill } from "@shopify/react-native-skia";
import Simbol, { COLUMNS, ROWS } from "./Simbol";

export default function BuildingLetters() {
  const { width, height } = useWindowDimensions();
  const col = new Array(COLUMNS).fill(null).map((_, i) => i);
  const row = new Array(ROWS).fill(null).map((_, i) => i);
  return (
    <Canvas style={{ flex: 1, width: width, height: height * 0.55 }}>
      <Fill color="rgba(0,0,0,0.8)" />

      {row.map((_, i) => {
        return col.map((__, j) => {
          return <Simbol key={`${i}-${j}`} i={i} j={j} />;
        });
      })}
    </Canvas>
  );
}

const styles = StyleSheet.create({});
