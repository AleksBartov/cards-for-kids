import { Pressable, StyleSheet, Dimensions, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MemoItem from "../components/memo/MemoItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const PADDING_HOR = 20;
const PADDING_TOP = 120;
const GAP = 12;
const COLUMNS = 3;
const ITEM_SIZE = Math.floor(
  (width - PADDING_HOR * 2 - GAP * (COLUMNS - 1)) / COLUMNS
);
const PRE_ROWS = Math.floor((height - PADDING_TOP) / (ITEM_SIZE + GAP));
const ROWS = PRE_ROWS % 2 === 0 ? PRE_ROWS : PRE_ROWS - 1;
const ITEMS = COLUMNS * ROWS;
const items_data = new Array(ITEMS).fill(null);

export default function memo() {
  const [openedItems, setOpenedItems] = useState([]);
  const route = useRouter();
  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable
        style={{ ...StyleSheet.absoluteFill, marginLeft: 20, marginTop: 40 }}
        onPress={() => route.back("/")}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={32}
          color="#EEF2F5"
        />
      </Pressable>
      <View style={styles.box}>
        {items_data.map((_, index) => {
          return <MemoItem key={index} index={index} itemSize={ITEM_SIZE} />;
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
