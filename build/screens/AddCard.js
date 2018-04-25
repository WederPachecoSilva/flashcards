import * as React from "react";
import { v4 } from "uuid";
import { addCard } from "../utils/flashcardsAPI";
import Input from "../components/primitives/Input";
import Container from "../components/primitives/Container";
import Button from "../components/primitives/Button";
import Alert from "../components/primitives/Alert";
import Radio from "../components/primitives/Radio";
class AddCard extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { level: "easy", question: "", answer: "", error: false };
        this.changeQuention = (question) => {
            this.setState({ question });
        };
        this.changeAnswer = (answer) => {
            this.setState({ answer });
        };
        this.changeLevel = (level) => {
            this.setState({ level });
        };
        this.submitCard = () => {
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
    }
    render() {
        const { error, question, answer, level } = this.state;
        return (<Container>
        <Input placeholder="Question" value={question} onChangeText={this.changeQuention} underlineColorAndroid="transparent"/>
        {error && !question && <Alert>Question field is required!</Alert>}
        <Input placeholder="Answer" value={answer} onChangeText={this.changeAnswer} multiline={true} numberOfLines={4} editable={true} underlineColorAndroid="transparent"/>
        {error && !answer && <Alert>Answer field is required!</Alert>}
        <Radio choices={["easy", "intermediate", "hard"]} onValueChange={this.changeLevel} value={level}/>
        <Button primary color="#00008B" title="Submit" onPress={this.submitCard}/>
      </Container>);
    }
}
export default AddCard;
