import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function memo() {
  const route = useRouter();
  return (
    <View style={styles.container}>
      <Pressable style={{ margin: 60 }} onPress={() => route.back("/")}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={32}
          color="black"
        />
      </Pressable>
      <Text>memo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
