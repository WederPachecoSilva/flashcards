import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../primitives/Button";
import Container from "../primitives/Container";

const AnswerCard = ({
  card,
  handleCorrect,
  handleIncorrect,
  handleNext,
  score,
  isLast,
}) => (
  <View style={styles.container}>
    <Text style={styles.big}>{card.answer}</Text>
    <Text style={styles.small}>Score {score}%</Text>
    <Button primary color="green" title="Correct" onPress={handleCorrect} />
    <Button primary color="red" title="Incorrect" onPress={handleIncorrect} />
    <Button
      primary
      color="blue"
      title={isLast ? "Finish" : "Next"}
      onPress={handleNext}
    />
  </View>
);

const styles = StyleSheet.create({
  small: {
    fontSize: 20,
    margin: 20,
  },
  big: {
    fontSize: 25,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnswerCard;
