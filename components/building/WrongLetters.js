import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WrongAnswer from "./WrongAnswer";

export default function WrongLetters() {
  return (
    <View style={{ flexDirection: "row" }}>
      <WrongAnswer text="В" />
      <WrongAnswer text="П" />
      <WrongAnswer text="А" />
      <WrongAnswer text="Е" />
      <WrongAnswer text="Л" />
      <WrongAnswer text="Ж" />
    </View>
  );
}

const styles = StyleSheet.create({});
