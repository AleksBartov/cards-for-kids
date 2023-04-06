import { StyleSheet, Text } from "react-native";
import React from "react";
import Animated, {
  FadeInUp,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function MemoItem({
  index,
  itemSize,
  text,
  clicked,
  closeAll,
  twoAreOpened,
}) {
  const opened = useSharedValue(false);
  const close = useSharedValue(false);
  const back = useSharedValue(0);
  const front = useSharedValue(180);

  useAnimatedReaction(
    () => closeAll.value,
    (result) => {
      // console.log(`closeAll value is: ${result}`);
      if (result && result === 1) {
        // console.log(`closeAll value checked as 1`);
        back.value = withDelay(600, withTiming(0));
        front.value = withDelay(
          600,
          withTiming(180, {}, () => {
            opened.value = false;
            clicked.value = false;
          })
        );
      } else if (result && result === 2) {
        if (opened.value) {
          close.value = true;
          opened.value = false;
          clicked.value = false;
        }
      }
    }
  );

  const backGesture = Gesture.Tap().onEnd(() => {
    // don't touch if opened two cards
    if (twoAreOpened.value === 2) return;
    twoAreOpened.value++;
    if (!opened.value) {
      closeAll.value = false;
      // console.log("tab clicked");
      back.value = withSpring(back.value === 0 ? 180 : 0);
      front.value = withSpring(front.value === 0 ? 180 : 0, {}, () => {
        clicked.value = `${index}_${text.text}`;
        opened.value = true;
      });
    }
  });

  const styleBox = useAnimatedStyle(() => {
    return {
      transform: [{ scale: close.value ? withTiming(0) : 1 }],
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

  return (
    <Animated.View
      entering={FadeInUp.delay(Math.random() * 700).duration(600)}
      style={[{ width: itemSize, height: itemSize }, styles.memoCard, styleBox]}
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
