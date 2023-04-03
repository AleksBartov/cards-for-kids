import { Pressable, StyleSheet, Dimensions, View } from "react-native";
import React, { useEffect, useState } from "react";

import { useFonts, Nunito_500Medium } from "@expo-google-fonts/nunito";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MemoItem from "../components/memo/MemoItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withDelay,
} from "react-native-reanimated";
import { consonants, vowels } from "../CONSTANTS";

const { width, height } = Dimensions.get("window");

const PADDING_HOR = 20;
const PADDING_TOP = 120;
const GAP = 12;
const COLUMNS = 2;
const ITEM_SIZE = Math.floor(
  (width - PADDING_HOR * 2 - GAP * (COLUMNS - 1)) / COLUMNS
);
const PRE_ROWS = Math.floor((height - PADDING_TOP) / (ITEM_SIZE + GAP));
const ROWS = PRE_ROWS % 2 === 0 ? PRE_ROWS : PRE_ROWS - 1;
const ITEMS = COLUMNS * ROWS;

const words = consonants
  .flatMap((con) => {
    return vowels.flatMap((l) => {
      return [`${con}${l}`, `${l}${con}`];
    });
  })
  .reduce((acc, l) => {
    let random = Math.floor(Math.random() * acc.length);
    acc.splice(random, 0, l);
    return acc;
  }, [])
  .slice(0, ITEMS / 2)
  .map((l, i) => {
    return {
      text: l,
      id: i,
      // color: "#" + (Math.random().toString(16) + "000000").substring(2, 8),
    };
  });

export default function memo() {
  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
  });

  const preCards = new Array(ITEMS).fill(null).map((_, i) => {
    return { id: Math.random() };
  });

  const letters = [...words, ...words].reduce((acc, l) => {
    let random = Math.floor(Math.random() * acc.length);
    acc.splice(random, 0, l);
    return acc;
  }, []);

  const cards = useSharedValue(preCards);
  const clicked = useSharedValue(null);
  const closeAll = useSharedValue(null);
  const twoAreOpened = useSharedValue(0);
  const route = useRouter();

  useAnimatedReaction(
    () => clicked.value,
    (d, p) => {
      // console.log(d, p);
      if (d && p && d.slice(-2) !== p.slice(-2)) {
        closeAll.value = 1;
        twoAreOpened.value = 0;
      } else if (d && p && d.slice(-2) === p.slice(-2)) {
        closeAll.value = 2;
        twoAreOpened.value = 0;
      }
    }
  );

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable
        style={{
          ...StyleSheet.absoluteFill,
          width: 32,
          height: 32,
          marginLeft: 20,
          marginTop: 40,
        }}
        onPress={() => {
          // setExit((e) => !e);
          route.back("/");
        }}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={32}
          color="#EEF2F5"
        />
      </Pressable>
      <View style={styles.box}>
        {cards.value.map((card, index) => {
          const t = letters[index];
          return (
            <MemoItem
              key={index}
              index={index}
              itemSize={ITEM_SIZE}
              text={t}
              clicked={clicked}
              closeAll={closeAll}
              twoAreOpened={twoAreOpened}
            />
          );
        })}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#01569E",
    paddingHorizontal: PADDING_HOR,
    paddingTop: PADDING_TOP,
  },
  box: {
    width: width - PADDING_HOR * 2,
    height: height - PADDING_TOP,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
});
