import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, View } from "react-native";
import { useFonts, Nunito_500Medium } from "@expo-google-fonts/nunito";
import Card from "../Card";
import Animated, { useSharedValue } from "react-native-reanimated";
import { useEffect } from "react";
import { Audio } from "expo-av";
import { vowels, consonants, LENGTH } from "../CONSTANTS";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const words = consonants
  .flatMap((con) => {
    return vowels.flatMap((l) => {
      return [`${con}${l}`, `${l}${con}`];
    });
  })
  .reduce((acc, l) => {
    let random = Math.floor(Math.random() * acc.length);
    acc.splice(random, 0, l);
    return acc;
  }, [])
  .reduce((acc, l, i) => {
    const chunk = Math.floor(i / LENGTH);
    if (!acc[chunk]) {
      acc[chunk] = [];
    }
    acc[chunk].push(l);
    return acc;
  }, []);

export default function App() {
  const route = useRouter();
  const shuffleBack = useSharedValue(false);

  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable
        style={{ marginLeft: 20, marginTop: 40 }}
        onPress={() => route.back("/")}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={32}
          color="#EEF2F5"
        />
      </Pressable>
      {words.map((l, i) => (
        <Card key={i} textArray={l} index={i} shuffleBack={shuffleBack} />
      ))}
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01569E",
  },
});
