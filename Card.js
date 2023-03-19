import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

const CARD_WIDTH = width*0.75;
const CARD_HEIGHT = CARD_WIDTH*1.614;
const BORDER_PADDING = 6;

export default function Card({ text, index }) {
    
  return (
    <View style={styles.card_container}>
        <View style={styles.card_inner_border}>
          <Text style={styles.card_text}>{text}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    card_container: {
        ...StyleSheet.absoluteFill,
        transform: [
          { translateX: width/2 - CARD_WIDTH/2},
          { translateY: height/2 - CARD_HEIGHT/2},
        ],
        backgroundColor: '#EEF2F5',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      card_inner_border: {
        backgroundColor: '#EEF2F5',
        width: CARD_WIDTH - BORDER_PADDING,
        height: CARD_HEIGHT - BORDER_PADDING,
        borderRadius: 10,
        borderColor: '#2C3941',
        borderWidth: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      card_text: {
        color: '#2C3941',
        fontSize: CARD_WIDTH-180,
      },
})