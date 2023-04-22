import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import {
  Group,
  Text,
  useComputedValue,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { createNoise2D } from "simplex-noise";

const LETTERS = ["М", "У", "К", "Е", "Н", "В", "А", "П", "Р", "О", "Я", "С"];

export const COLUMNS = 3;
export const ROWS = 3;
export const TEXT_MARGIN = 60;
const A = 40;
const F = 0.0005;

export default function Simbol({ i, j, clock, font }) {
  const { width, height } = useWindowDimensions();
  const translateX = useValue();
  const translateY = useValue();
  const noise = createNoise2D();
  const thisHeight = height * 0.55;
  const x = j * (width / COLUMNS);
  const y = j * (thisHeight / ROWS);
  const origin = vec(
    j * (width / COLUMNS) + width / COLUMNS / 2,
    i * (thisHeight / ROWS) + thisHeight / ROWS / 2
  );
  const text = LETTERS[Math.round(Math.random() * (LETTERS.length - 1))];
  const dx = useComputedValue(() => {
    const d = A * noise(x, clock.current * F);
    return origin.x - width / COLUMNS / 2 + d;
  }, [clock]);
  const dy = useComputedValue(() => {
    const d = A * noise(y, clock.current * F);
    return origin.y + thisHeight / ROWS / 2 + d;
  }, [clock]);
  return (
    <Group transform={[{ scale: 0.6 }]} origin={origin}>
      <Text text={text} font={font} x={dx} y={dy} color="#EEF2F5" />
    </Group>
  );
}

const styles = StyleSheet.create({});
