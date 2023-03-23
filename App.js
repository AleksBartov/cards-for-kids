import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts, Nunito_500Medium } from "@expo-google-fonts/nunito";
import Card from "./Card";
import { useSharedValue } from "react-native-reanimated";
import { useEffect } from "react";
import { Audio } from "expo-av";
import { vowels, consonants, LENGTH } from "./CONSTANTS";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  const shuffleBack = useSharedValue(false);

  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
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
