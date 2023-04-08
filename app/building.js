import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Letters from "../components/building/Letters";

export default function building() {
  const route = useRouter();
  const { width } = useWindowDimensions();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable
        style={{
          ...StyleSheet.absoluteFillObject,
          width: 32,
          height: 32,
          marginLeft: 20,
          marginTop: 40,
        }}
        onPress={() => route.back("/")}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={32}
          color="#EEF2F5"
        />
      </Pressable>
      <MaterialCommunityIcons name="cat" size={width / 2} color="#EEF2F5" />
      <Letters />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01569E",
    justifyContent: "center",
    alignItems: "center",
  },
});
