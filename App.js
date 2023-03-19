import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import Card from './Card';

export default function App() {
  const letters = [ 'ПА', 'ПА', 'ПА', 'ПА', 'ПА', 'ПА' ]
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {
        letters.map((l,i) => <Card key={i} text={l} index={i} />)
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01569E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
