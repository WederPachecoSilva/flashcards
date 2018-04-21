import { AsyncStorage } from "react-native";
import { decks } from "./seeds";
import { v4 } from "uuid";
// Initialize hardcoded data to app
export const initializeData = async () => {
    try {
        const result = AsyncStorage.setItem("decks", JSON.stringify(decks));
        return result;
    }
    catch (error) {
        return error;
    }
};
export const getDecks = async () => {
    try {
        const stringifiedDeck = await AsyncStorage.getItem("decks");
        const decks = JSON.parse(stringifiedDeck);
        return decks;
    }
    catch (error) {
        return error;
    }
};
export const getDeck = async (deckId) => {
    try {
        const stringifiedDeck = await AsyncStorage.getItem("decks");
        const decks = JSON.parse(stringifiedDeck);
        return decks[deckId];
    }
    catch (error) {
        return error;
    }
};
export const saveDeckTitle = async (title) => {
    try {
        const id = v4();
        const deck = { [id]: { id, title, cards: [] } };
        await AsyncStorage.mergeItem("decks", JSON.stringify(deck));
        const result = await AsyncStorage.getItem("decks");
        return JSON.parse(result);
    }
    catch (error) {
        return error;
    }
};
/**
 * It doesn't exactly deletes the card but set the deleted property of a specific card to true
 */
export const deleteCardFromDeck = async (deckId, cardId) => {
    try {
        const stringifiedDecks = await AsyncStorage.getItem("decks");
        const decks = JSON.parse(stringifiedDecks);
        decks[deckId].cards[cardId].deleted = true;
        await AsyncStorage.setItem("decks", decks);
        return decks[deckId].cards;
    }
    catch (error) {
        return error;
    }
};
export const deleteDeck = async (deckTitle) => {
    try {
        const stringifiedDecks = await AsyncStorage.getItem("decks");
        const decks = JSON.parse(stringifiedDecks);
        delete decks[deckTitle];
        const result = AsyncStorage.setItem("decks", decks);
        return result;
    }
    catch (error) {
        return error;
    }
};
export const addCardToDeck = async (deckTitle, card) => {
    try {
        const deck = { [deckTitle]: card };
        const result = AsyncStorage.mergeItem(deckTitle, JSON.stringify(deck));
        return result;
    }
    catch (error) {
        return error;
    }
};
