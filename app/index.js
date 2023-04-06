import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import Animated, { BounceInRight } from "react-native-reanimated";

const ICON_SIZE = 70;
const DURATION = 800;

export default function index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Animated.View entering={BounceInRight.delay(100).duration(DURATION)}>
        <Pressable
          style={styles.itemButton}
          onPress={() => {
            router.push("cards");
          }}
        >
          <MaterialCommunityIcons
            name="cards"
            size={ICON_SIZE}
            color="#EEF2F5"
          />
        </Pressable>
      </Animated.View>
      <Animated.View entering={BounceInRight.delay(200).duration(DURATION)}>
        <Pressable
          style={styles.itemButton}
          onPress={() => {
            router.push("memo");
          }}
        >
          <Ionicons
            name="md-game-controller"
            size={ICON_SIZE}
            color="#EEF2F5"
          />
        </Pressable>
      </Animated.View>
      <Animated.View entering={BounceInRight.delay(300).duration(DURATION)}>
        <Pressable
          style={styles.itemButton}
          onPress={() => {
            router.push("drawing");
          }}
        >
          <Entypo name="pencil" size={ICON_SIZE} color="#EEF2F5" />
        </Pressable>
      </Animated.View>
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
  itemButton: {
    backgroundColor: "#2C3941",
    marginVertical: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
