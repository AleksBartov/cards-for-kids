import { Pressable, StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MemoItem from "../components/memo/MemoItem";

const { width, height } = Dimensions.get("window");

const PADDING_HOR = 20;
const PADDING_TOP = 120;
const GAP = 12;
const COLUMNS = 3;
const ITEM_SIZE = Math.floor(
  (width - PADDING_HOR * 2 - GAP * (COLUMNS - 1)) / COLUMNS
);
const ROWS = Math.floor((height - PADDING_TOP) / ITEM_SIZE);
const ITEMS = COLUMNS * ROWS;

export default function memo() {
  const route = useRouter();
  return (
    <View style={styles.container}>
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
        {new Array(ITEMS).fill(null).map((_, index) => {
          return <MemoItem key={index} index={index} itemSize={ITEM_SIZE} />;
        })}
      </View>
    </View>
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
