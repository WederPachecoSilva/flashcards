import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationRoute } from "react-navigation/index";

import { Deck } from "../utils/types";
import Container from "../components/primitives/Container";
import Button from "../components/primitives/Button";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../utils/notification";
import { getDeck } from "../utils/flashcardsAPI";

interface Params {
  deckId: string;
  score: number;
}

interface P {
  navigation: NavigationScreenProp<NavigationRoute<Params>, Params>;
}

interface S {
  deck: Deck | {};
}

class QuizzResult extends React.Component<P, S> {
  state = { deck: {} };
  async componentDidMount() {
    try {
      const { deckId } = this.props.navigation.state.params;
      const deck = await getDeck(deckId);
      await this.setState({ deck });
      await clearLocalNotification();
      await setLocalNotification();
    } catch (error) {
      return error;
    }
  }

  render() {
    const { score, deckId } = this.props.navigation.state.params;
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
          title="Back to Deck"
          onPress={() =>
            this.props.navigation.navigate("DeckDetail", {
              deck: this.state.deck,
            })
          }
        />
        <Button
          color={"blue"}
          title="Restart Quizz"
          onPress={() =>
            this.props.navigation.navigate("CardDetail", { deckId })
          }
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
