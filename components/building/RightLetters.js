import { View } from "react-native";
import React from "react";
import RightAnswer from "./RightAnswer";
import RestLetters from "./RestLetters";
import { useSharedValue } from "react-native-reanimated";

export default function RightLetters() {
  const changeColor = useSharedValue(false);
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <RightAnswer text="К" />
      <RestLetters text="О" changeColor={changeColor} />
      <RestLetters text="Т" changeColor={changeColor} />
    </View>
  );
}
