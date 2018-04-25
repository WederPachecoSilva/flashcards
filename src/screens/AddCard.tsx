import * as React from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { v4 } from "uuid";

import { addCard } from "../utils/flashcardsAPI";
import Input from "../components/primitives/Input";
import Container from "../components/primitives/Container";
import Button from "../components/primitives/Button";
import Alert from "../components/primitives/Alert";
import Radio from "../components/primitives/Radio";

type Level = "easy" | "intermediate" | "hard";

interface S {
  level: Level;
  answer: string;
  question: string;
  error: boolean;
}

class AddCard extends React.Component<any, S> {
  state: S = { level: "easy", question: "", answer: "", error: false };

  changeQuention = (question: string) => {
    this.setState({ question });
  };

  changeAnswer = (answer: string) => {
    this.setState({ answer });
  };

  changeLevel = (level: Level) => {
    this.setState({ level });
  };

  submitCard = () => {
    const { question, answer, level } = this.state;
    const { deckId } = this.props.navigation.state.params;

    if (!question || !answer) {
      this.setState({ error: true });
      return;
    }

    const id = v4();
    const card = { question, answer, id, level, deleted: false };
    addCard(deckId, card);
    this.props.navigation.navigate("DecksList");
  };

  render() {
    const { error, question, answer, level } = this.state;
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
        <Radio
          choices={["easy", "intermediate", "hard"]}
          onValueChange={this.changeLevel}
          value={level}
        />
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
