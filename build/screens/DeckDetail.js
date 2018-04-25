import * as React from "react";
import { Text, StyleSheet } from "react-native";
import Container from "../components/primitives/Container";
import Button from "../components/primitives/Button";
import { deleteDeck } from "../utils/flashcardsAPI";
class DeckDetail extends React.Component {
    constructor() {
        super(...arguments);
        this.deleteDeck = id => {
            deleteDeck(id);
            this.props.navigation.navigate("DecksList");
        };
    }
    render() {
        const { navigation } = this.props;
        const { title, cards, id } = navigation.state.params.deck;
        return (<Container>
        <Text style={styles.bigText}>{title}</Text>
        <Text style={styles.smallText}>{cards.length} cards</Text>
        {cards &&
            cards.length > 0 && (<Button color="black" primary title="Start Quiz" onPress={() => navigation.navigate("CardDetail", { deckId: id, index: 0 })}/>)}
        <Button color="black" title="Add Card" onPress={() => navigation.navigate("AddCard", { deckId: id })}/>

        <Button color="black" title="Delete Deck" onPress={() => this.deleteDeck(id)}/>
      </Container>);
    }
}
const styles = StyleSheet.create({
    bigText: {
        fontSize: 30,
    },
    smallText: {
        fontSize: 20,
        marginBottom: 30,
    },
});
export default DeckDetail;
