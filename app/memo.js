import {
  Pressable,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useFonts, Nunito_500Medium } from "@expo-google-fonts/nunito";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import MemoItem from "../components/memo/MemoItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { consonants, vowels } from "../CONSTANTS";

const { width, height } = Dimensions.get("window");

const PADDING_HOR = 20;
const MARGIN_TOP_FOR_ICON = Platform.OS === "ios" ? 40 : 20;
const PADDING_TOP = MARGIN_TOP_FOR_ICON + 40;
const GAP = 12;

export default function memo() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [columns, setColumns] = useState(2);

  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
  });
  useEffect(() => {}, [columns, setColumns, newGame, setNewGame, modalVisible]);

  const ITEM_SIZE = Math.floor(
    (width - PADDING_HOR * 2 - GAP * (columns - 1)) / columns
  );
  const PRE_ROWS = Math.floor((height - PADDING_TOP) / (ITEM_SIZE + GAP));
  const ROWS = PRE_ROWS % 2 === 0 ? PRE_ROWS : PRE_ROWS - 1;
  let ITEMS = columns * ROWS;

  let words = consonants
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
    .slice(0, ITEMS / 2)
    .map((l, i) => {
      return {
        text: l,
        id: i,
      };
    });

  const preCards = new Array(ITEMS).fill(null).map((_, i) => {
    return { id: Math.random() };
  });

  const letters = [...words, ...words].reduce((acc, l) => {
    let random = Math.floor(Math.random() * acc.length);
    acc.splice(random, 0, l);
    return acc;
  }, []);

  const clicked = useSharedValue(null);
  const closeAll = useSharedValue(null);
  const twoAreOpened = useSharedValue(0);
  const route = useRouter();

  useAnimatedReaction(
    () => clicked.value,
    (d, p) => {
      // console.log(d, p);
      if (d && p && d.slice(-2) !== p.slice(-2)) {
        closeAll.value = 1;
        twoAreOpened.value = 0;
      } else if (d && p && d.slice(-2) === p.slice(-2)) {
        closeAll.value = 2;
        twoAreOpened.value = 0;
      }
    }
  );

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={{ width: width * 0.33 }}
          onPress={() => {
            route.back("/");
          }}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={32}
            color="#EEF2F5"
          />
        </Pressable>

        <TouchableOpacity
          style={{
            width: width * 0.33,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setNewGame(true);
            setTimeout(() => {
              setNewGame(false);
            }, 100);
          }}
        >
          <Text style={{ color: "#ff5e5b", fontSize: 22 }}>новая игра</Text>
        </TouchableOpacity>

        <Pressable
          style={{
            width: width * 0.33,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={{ color: "#EEF2F5", fontSize: 22 }}>{columns}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={32} color="#EEF2F5" />
        </Pressable>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width,
          }}
        >
          <View style={styles.modelContainer}>
            <Pressable
              onPress={() => {
                setColumns(2);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modelText}>2</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setColumns(3);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modelText}>3</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setColumns(4);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modelText}>4</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setColumns(5);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modelText}>5</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.box}>
        {modalVisible || newGame
          ? null
          : preCards.map((card, index) => {
              const t = letters[index];
              return (
                <MemoItem
                  key={index}
                  index={index}
                  itemSize={ITEM_SIZE}
                  text={t}
                  clicked={clicked}
                  closeAll={closeAll}
                  twoAreOpened={twoAreOpened}
                />
              );
            })}
      </View>
    </GestureHandlerRootView>
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
  box: {
    width: width - PADDING_HOR * 2,
    height: height - PADDING_TOP,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  header: {
    ...StyleSheet.absoluteFill,
    width,
    height: 32,
    marginTop: MARGIN_TOP_FOR_ICON,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  modelContainer: {
    width,
    height: 100,
    backgroundColor: "#EEF2F5",
    opacity: 0.9,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modelButton: {},
  modelText: { color: "#2C3941", fontSize: 80, marginVertical: 30 },
});
