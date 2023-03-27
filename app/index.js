import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const ICON_SIZE = 70;

export default function index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          router.push("cards");
        }}
      >
        <MaterialCommunityIcons name="cards" size={ICON_SIZE} color="#EEF2F5" />
      </Pressable>
      <Pressable
        onPress={() => {
          router.push("memo");
        }}
      >
        <Ionicons name="md-game-controller" size={ICON_SIZE} color="#EEF2F5" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#01569E",
  },
});
