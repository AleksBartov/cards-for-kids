import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import RightLetters from "./RightLetters";
import WrongLetters from "./WrongLetters";
const { width } = Dimensions.get("window");
export default function Letters() {
  return (
    <View style={styles.container}>
      <RightLetters />
      <WrongLetters />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
});
