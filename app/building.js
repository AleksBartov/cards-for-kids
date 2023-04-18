import { StyleSheet, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import BuildingMain from "../components/building/BuildingMain";

export default function building() {
  const route = useRouter();

  return (
    <View style={styles.container}>
      <BuildingMain />
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
    </View>
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
