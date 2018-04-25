import * as React from "react";
import { Text, StyleSheet, AsyncStorage } from "react-native";
import { getCardsByDeck } from "../utils/flashcardsAPI";
import Container from "../components/primitives/Container";
import Alert from "../components/primitives/Alert";
import QuestionCard from "../components/Cards/QuestionCard";
import AnswerCard from "../components/Cards/AnswerCard";
import { clearLocalNotification, setLocalNotification, } from "../utils/notification";
function percentage(partialValue, totalValue) {
    const percentage = 100 * partialValue / totalValue;
    return percentage.toFixed(2);
}
class CardDetail extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasError: false,
            cards: [],
            score: 0,
            numOfCorrects: 0,
            isQuestion: true,
            isAnswer: false,
            index: 0,
            isLast: false,
        };
        this.handleNext = async () => {
            const { cards, index, isLast } = this.state;
            const { deckId } = this.props.navigation.state.params;
            // checks if it is the last card
            if (cards.length === index + 1) {
                this.props.navigation.navigate("DecksList");
            }
            if (cards.length === index + 2) {
                this.setState({ isLast: true });
            }
            await this.setState(prev => ({
                isQuestion: true,
                isAnswer: false,
                index: prev.index + 1,
            }));
        };
        this.checkAnswer = () => {
            this.setState({ isQuestion: false, isAnswer: true });
        };
        this.handleCorrect = async () => {
            await this.setState(prev => ({ numOfCorrects: prev.numOfCorrects + 1 }));
            const score = percentage(this.state.numOfCorrects, this.state.index + 1);
            this.setState({ score });
        };
        this.handleIncorrect = async () => {
            await this.setState(prev => ({ numOfCorrects: prev.numOfCorrects - 1 }));
            const score = percentage(this.state.numOfCorrects, this.state.index + 1);
            this.setState({ score });
        };
    }
    async componentDidMount() {
        const { deckId } = this.props.navigation.state.params;
        await getCardsByDeck(deckId)
            .then(cards => this.setState({ cards }))
            .catch(err => this.setState({ hasError: true }));
        const date = new Date();
        AsyncStorage.setItem("LAST_QUIZZ_HOUR", JSON.stringify(date.getHours()));
        clearLocalNotification().then(setLocalNotification);
    }
    render() {
        const { isLast, hasError, cards, isQuestion, isAnswer, score, index, } = this.state;
        const numOfCards = cards.length;
        return (<Container>
        <Text style={styles.text}>
          {index + 1}/{numOfCards}
        </Text>
        {hasError && alert("something wrong hapenned")}
        {cards.length === 0 && (<Container>
            <Alert style={styles.alert}>No deck to choose</Alert>
          </Container>)}
        {cards[index] &&
            isQuestion && (<QuestionCard card={cards[index]} checkAnswer={this.checkAnswer}/>)}
        {cards[index] &&
            isAnswer && (<AnswerCard card={cards[index]} handleCorrect={this.handleCorrect} handleIncorrect={this.handleIncorrect} handleNext={this.handleNext} score={score} isLast={isLast}/>)}
      </Container>);
    }
}
const styles = StyleSheet.create({
    alert: {
        marginTop: 60,
    },
    text: {
        marginLeft: 5,
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
