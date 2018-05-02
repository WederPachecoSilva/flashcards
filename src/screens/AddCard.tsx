import * as React from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { v4 } from "uuid";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";

import { addCardToDeck, getDeck } from "../utils/flashcardsAPI";
import Input from "../components/primitives/Input";
import Container from "../components/primitives/Container";
import Button from "../components/primitives/Button";
import Alert from "../components/primitives/Alert";
import Radio from "../components/primitives/Radio";
import { Deck } from "../utils/types";

interface S {
  answer: string;
  question: string;
  error: boolean;
  deck: Deck | {};
}

interface P {
  navigation: NavigationScreenProp<
    NavigationRoute<{ deckId: string }>,
    { deckId: string }
  >;
}

class AddCard extends React.Component<P, S> {
  state = { question: "", answer: "", error: false, deck: {} };

  async componentDidMount() {
    const deck = await getDeck(this.props.navigation.state.params.deckId);
    this.setState({ deck });
  }

  changeQuention = (question: string) => {
    this.setState({ question });
  };

  changeAnswer = (answer: string) => {
    this.setState({ answer });
  };

  submitCard = async () => {
    const { question, answer } = this.state;
    const { deckId } = this.props.navigation.state.params;

    if (!question || !answer) {
      this.setState({ error: true });
      return;
    }

    const id = v4();
    const card = { question, answer, id, deleted: false };
    await addCardToDeck(deckId, card);
    const updatedDeck = await getDeck(deckId);
    await this.setState({ deck: updatedDeck });
    this.props.navigation.navigate("DeckDetail", { deck: this.state.deck });
  };

  render() {
    const { error, question, answer } = this.state;
    return (
      <Container>
        <Input
          placeholder="Question"
          value={question}
          onChangeText={this.changeQuention}
          underlineColorAndroid="transparent"
        />
        {error && !question && <Alert>Question field is required!</Alert>}
        <Input
          placeholder="Answer"
          value={answer}
          onChangeText={this.changeAnswer}
          multiline={true}
          numberOfLines={4}
          editable={true}
          underlineColorAndroid="transparent"
        />
        {error && !answer && <Alert>Answer field is required!</Alert>}
        <Button
          primary
          color="#00008B"
          title="Submit"
          onPress={this.submitCard}
        />
      </Container>
    );
  }
}

export default AddCard;
