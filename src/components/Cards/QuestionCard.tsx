import * as React from "react";
import { Text, StyleSheet, View } from "react-native";

import { Card } from "../../utils/types";
import Button from "../primitives/Button";

interface P {
  card: Card;
  checkAnswer(): void;
}

const QuestionCard = ({ card, checkAnswer }: P) => (
  <View>
    <Text style={styles.text}>{card.question}</Text>
    <Button
      style={styles.button}
      color="blue"
      title="See Answer"
      onPress={checkAnswer}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
  button: {
    marginRight: "auto",
    marginLeft: "auto",
  },
});

export default QuestionCard;
