import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import {
  Skia,
  Path,
  Canvas,
  Circle,
  Group,
  Mask,
  RoundedRect,
  Text,
  useFont,
  useTouchHandler,
  useValue,
  Drawing,
  vec,
  PointMode,
  useComputedValue,
  useSpring,
  runTiming,
  point,
} from "@shopify/react-native-skia";
import { withSpring } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const PADDING_HOR = 20;
const PADDING_TOP = 120;
const SIZE = width - PADDING_HOR * 2.2;

const fontSize = width / 2;
const STROKE_WIDTH = 30;

export default function SkiaDrawingCards() {
  const cx = useValue(STROKE_WIDTH / 2);
  const cy = useValue(SIZE);
  const points = useValue(`M ${cx.current} ${cy.current}`);
  const font = useFont(require("../../assets/fontForDrawing.ttf"), fontSize);

  const path = useComputedValue(() => {
    points.current = points.current + "L" + cx.current + " " + cy.current;
    return points.current;
  }, [cx, cy]);

  const touchHandler = useTouchHandler({
    onActive: ({ x, y }) => {
      cx.current = x;
      cy.current = y;
    },
  });
  if (font === null) {
    return null;
  }
  return (
    <Canvas style={{ width: SIZE, height: SIZE }} onTouch={touchHandler}>
      <Mask
        mode="luminance"
        mask={
          <Group>
            <RoundedRect
              x={0}
              y={0}
              width={SIZE}
              height={SIZE}
              r={10}
              color="rgba(255,255,255,.9)"
            />
          </Group>
        }
      >
        <Text x={0} y={width * 0.6} text="МИ" font={font} color="black" />
      </Mask>
      <Path
        path={path}
        color="red"
        style="stroke"
        strokeJoin="round"
        strokeWidth={STROKE_WIDTH}
        // We trim the first and last quarter of the path
        start={0}
        end={1}
      />
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
