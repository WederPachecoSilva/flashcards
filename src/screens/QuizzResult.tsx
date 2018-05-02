import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationRoute } from "react-navigation/index";

import { Card } from "../utils/types";
import Container from "../components/primitives/Container";
import Button from "../components/primitives/Button";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../utils/notification";

interface Params {
  card: Card;
  score: number;
}

interface P {
  navigation: NavigationScreenProp<NavigationRoute<Params>, Params>;
}

class QuizzResult extends React.Component<P, {}> {
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  render() {
    const { card, score } = this.props.navigation.state.params;
    let message: string;
    if (score < 25) {
      message = "Keep training!";
    } else if (score < 50) {
      message = "You are almost there!";
    } else if (score < 75) {
      message = "Not Bad! Keep going!";
    } else if (score < 100) {
      message = "Well done!";
    } else {
      message = "Congratulation! You have mastered it!";
    }
    return (
      <Container>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.text}>Your score is:</Text>
        <Text style={styles.score}>{score + "%"}</Text>
        <Button
          color={"blue"}
          title="Back"
          onPress={() => this.props.navigation.navigate("DecksList")}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    fontSize: 25,
    textAlign: "center",
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 21,
  },
  score: {
    fontSize: 25,
    marginBottom: 20,
  },
});

export default QuizzResult;
