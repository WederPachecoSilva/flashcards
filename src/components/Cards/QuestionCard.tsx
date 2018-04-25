import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import Button from "../primitives/Button";
import Container from "../primitives/Container";

const QuestionCard = ({ card, checkAnswer }) => (
  <View>
    <Text style={styles.text}>{card.question}</Text>
    <Button color="blue" title="See Answer" onPress={checkAnswer} />
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
  },
});

export default QuestionCard;
