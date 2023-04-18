import { StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import BuildingImage from "./BuildingImage";
import BuildingLetters from "./BuildingLetters";

export default function BuildingMain() {
  const { width: _width, height: _height } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        width: _width,
        height: _height,
      }}
    >
      <View
        style={{
          width: _width,
          height: _height * 0.45,
        }}
      >
        <BuildingImage />
      </View>
      <View
        style={{
          width: _width,
          height: _height * 0.55,
        }}
      >
        <BuildingLetters />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
