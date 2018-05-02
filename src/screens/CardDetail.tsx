import * as React from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";

import { getCardsByDeck } from "../utils/flashcardsAPI";
import Container from "../components/primitives/Container";
import Alert from "../components/primitives/Alert";
import Button from "../components/primitives/Button";
import QuestionCard from "../components/Cards/QuestionCard";
import AnswerCard from "../components/Cards/AnswerCard";

import { Cards } from "../utils/types";
import { percentage } from "../utils/helpers";

interface P {
  navigation: NavigationScreenProp<
    NavigationRoute<{ deckId: string }>,
    { deckId: string }
  >;
}

interface S {
  hasError: boolean;
  cards: Cards;
  score: number;
  numOfCorrects: number;
  isQuestion: boolean;
  isAnswer: boolean;
  index: number;
  isLast: boolean;
  answer: "none" | "correct" | "incorrect";
}

class CardDetail extends React.Component<P, S> {
  state: S = {
    answer: "none",
    hasError: false,
    cards: [],
    score: 0,
    numOfCorrects: 0,
    isQuestion: true,
    isAnswer: false,
    index: 0,
    isLast: false,
  };

  async componentDidMount() {
    try {
      const { deckId } = this.props.navigation.state.params;
      const cards = await getCardsByDeck(deckId);
      this.setState({ cards });
    } catch (error) {
      this.setState({ hasError: true });
    }
  }

  handleNext = async () => {
    const { cards, index, isLast, numOfCorrects, answer } = this.state;
    const { deckId } = this.props.navigation.state.params;

    this.setState({ answer: "none" });

    // Checks if it is the last card
    if (cards.length === index + 1) {
      const score = percentage(numOfCorrects, cards.length);
      await this.setState({ numOfCorrects: 0 });
      this.props.navigation.navigate("QuizzResult", {
        score,
        card: cards[index],
      });
    }

    // Checks if it is going to the last card
    if (cards.length === index + 2) {
      this.setState({ isLast: true });
    }

    await this.setState(prev => ({
      isQuestion: true,
      isAnswer: false,
      index: prev.index + 1,
    }));
  };

  checkAnswer = () => {
    this.setState({ isQuestion: false, isAnswer: true });
  };

  handleCorrect = () => {
    this.setState(prev => ({
      numOfCorrects: prev.numOfCorrects + 1,
      answer: "correct",
    }));
  };

  handleIncorrect = () => {
    this.setState(prev => ({
      answer: "incorrect",
    }));
  };

  render() {
    const {
      isLast,
      hasError,
      cards,
      isQuestion,
      isAnswer,
      score,
      index,
      answer,
    } = this.state;
    const numOfCards = cards.length;

    return (
      <Container>
        <Text style={styles.text}>
          {index + 1}/{numOfCards}
        </Text>
        {hasError && alert("something wrong hapenned")}
        {cards.length === 0 && (
          <Container>
            <Alert style={styles.alert}>No deck to choose</Alert>
          </Container>
        )}
        {cards[index] &&
          isQuestion && (
            <QuestionCard card={cards[index]} checkAnswer={this.checkAnswer} />
          )}
        {cards[index] &&
          isAnswer && (
            <AnswerCard
              card={cards[index]}
              handleCorrect={this.handleCorrect}
              handleIncorrect={this.handleIncorrect}
              handleNext={this.handleNext}
              isLast={isLast}
              answer={answer}
            />
          )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  alert: {
    marginTop: 60,
  },
  text: {
    marginLeft: 5,
    fontSize: 15,
    marginTop: 5,
  },
});

export default CardDetail;

// View de um baralho individual

// View do quiz
// exibe a pergunta do cartão
// uma opção de visualizar a resposta (virar o cartão) clicando em Answer
// um botão "Correto" para o usuário clicar caso ele tenha acertado a questão de acordo com a resposta que tinha em mente
// um botão "Incorreto" para o usuário clicar caso ele tenha errado a questão de acordo com a resposta que tinha em mente
// o número de cartões que faltam para terminar o quiz
// exibe a porcentagem correta assim que o quiz é completado
