import * as React from "react";
import { View, Text, StyleSheet, Button as NativeButton } from "react-native";

import { Card } from "../../utils/types";
import Button from "../primitives/Button";
import Container from "../primitives/Container";

interface P {
  card: Card;
  handleCorrect(): void;
  handleIncorrect(): void;
  handleNext(): void;
  isLast: boolean;
  answer: "none" | "correct" | "incorrect";
}

const AnswerCard = ({
  card,
  handleCorrect,
  handleIncorrect,
  handleNext,
  isLast,
  answer,
}: P) => (
  <Container>
    <Text style={styles.big}>{card.answer}</Text>
    <Button
      disabled={answer === "none" ? false : true}
      color="green"
      title="Correct"
      onPress={handleCorrect}
      style={{ width: 300 }}
      primary
    />
    <Button
      disabled={answer === "none" ? false : true}
      color="red"
      title="Incorrect"
      onPress={handleIncorrect}
      style={{ width: 300 }}
      primary
    />
    <Button
      primary
      color="blue"
      title={isLast ? "Finish" : "Next"}
      onPress={handleNext}
      style={{ width: 300 }}
    />
  </Container>
);

const styles = StyleSheet.create({
  big: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 15,
  },
  break: {
    marginTop: 8,
  },
});

export default AnswerCard;
