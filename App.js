import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import Card from "./Card";
import { useSharedValue } from "react-native-reanimated";
import { useEffect } from "react";
import { Audio } from "expo-av";

const vowels = ["А", "О", "У", "Я", "И", "Е"];
const consonants = ["Л", "М", "Н", "Р", "Б", "П", "В", "С", "К"];

const words = consonants
  .flatMap((con) => {
    return vowels.map((l) => {
      return `${con}${l}`;
    });
  })
  .reduce((acc, l) => {
    let random = Math.floor(Math.random() * acc.length);
    acc.splice(random, 0, l);
    return acc;
  }, []);

export default function App() {
  /*
  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);
  */
  const shuffleBack = useSharedValue(false);

  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {words.slice(0, 24).map((l, i) => (
        <Card key={i} text={l} index={i} shuffleBack={shuffleBack} />
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01569E",
  },
});
