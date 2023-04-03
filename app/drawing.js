import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import { useFonts, Nunito_500Medium } from "@expo-google-fonts/nunito";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const { width } = Dimensions.get("window");

const PADDING_HOR = 20;
const PADDING_TOP = 120;
const SIZE = width - PADDING_HOR * 2.2;

export default function drawing() {
  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
  });
  const route = useRouter();

  return (
    <View style={styles.container}>
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
      <View style={styles.card}>
        <Text style={styles.text}>МА</Text>
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
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEF2F5",
    width: SIZE,
    height: SIZE,
    borderRadius: 10,
  },
  text: {
    color: "#2C3941",
    fontSize: SIZE - 160,
    fontFamily: "Nunito_500Medium",
  },
});
