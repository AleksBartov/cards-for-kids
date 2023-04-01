import { StyleSheet, Text } from "react-native";
import React from "react";
import Animated, {
  SlideOutDown,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  ZoomIn,
  ZoomOutEasyUp,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function MemoItem({ index, itemSize, text, clicked, closeAll }) {
  const opened = useSharedValue(false);
  const close = useSharedValue(false);
  const back = useSharedValue(0);
  const front = useSharedValue(180);

  useAnimatedReaction(
    () => closeAll.value,
    (result) => {
      if (result && result === 1) {
        opened.value = false;

        back.value = withDelay(1000, withTiming(0));
        front.value = withDelay(1000, withTiming(180));
        clicked.value = false;
      } else if (result && result === 2) {
        if (opened.value) {
          close.value = true;
          clicked.value = false;
        }
      }
    }
  );

  const backGesture = Gesture.Tap().onEnd(() => {
    // close.value = true;
    if (opened.value) return;
    closeAll.value = false;
    opened.value = true;
    back.value = withSpring(back.value === 0 ? 180 : 0);
    front.value = withSpring(front.value === 0 ? 180 : 0);
    clicked.value = `${index}_${text.text}`;
  });

  const styleBox = useAnimatedStyle(() => {
    return {
      transform: [{ scale: close.value ? withDelay(700, withTiming(0)) : 1 }],
    };
  });
  const styleFront = useAnimatedStyle(() => {
    return {
      backgroundColor: "#EEF2F5",
      transform: [{ perspective: 1500 }, { rotateY: `${front.value}deg` }],
    };
  });
  const styleBack = useAnimatedStyle(() => {
    return {
      backgroundColor: "#2C3941",
      transform: [{ perspective: 1500 }, { rotateY: `${back.value}deg` }],
    };
  });

  // if (close.value) return null;

  return (
    <Animated.View
      style={[{ width: itemSize, height: itemSize }, styles.memoCard, styleBox]}
      entering={ZoomIn.delay(Math.random() * 700)}
      exiting={SlideOutDown}
    >
      <Animated.View style={[styles.backAndFront, styleFront]}>
        <Text
          style={{
            color: "#2C3941",
            fontFamily: "Nunito_500Medium",
            fontSize: itemSize / 2,
          }}
        >
          {text.text}
        </Text>
      </Animated.View>
      <GestureDetector gesture={backGesture}>
        <Animated.View style={[styles.backAndFront, styleBack]}>
          <Text style={{ color: "#EEF2F5", fontSize: itemSize / 2 }}>?</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  memoCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  backAndFront: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
