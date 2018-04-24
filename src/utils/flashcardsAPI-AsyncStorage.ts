import { AsyncStorage } from "react-native";
import { decks } from "./seeds";
import { Card, Decks, Deck, Cards } from "./types";
import { v4 } from "uuid";

/**
 * Inicialize hardcoded data to app
 */
export const initializeData = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem("decks", JSON.stringify(decks));
  } catch (error) {
    return error;
  }
};

export const getDecks = async (): Promise<Decks> => {
  try {
    const stringifiedDeck = await AsyncStorage.getItem("decks");
    const decks = JSON.parse(stringifiedDeck);
    return decks;
  } catch (error) {
    return error;
  }
};

export const getDeck = async (deckId: string): Promise<Deck> => {
  try {
    const stringifiedDeck = await AsyncStorage.getItem("decks");
    const decks = JSON.parse(stringifiedDeck);
    return decks[deckId];
  } catch (error) {
    return error;
  }
};

export const addDeck = async (title: string): Promise<void> => {
  try {
    const id = v4();
    const stringifiedDecks = await AsyncStorage.getItem("decks");
    const decks = JSON.parse(stringifiedDecks);
    const deck = { id, title, cards: [] };
    decks[deck.id] = deck;
    AsyncStorage.setItem("decks", decks);
  } catch (error) {
    return error;
  }
};

export const deleteDeck = async (deckTitle: string): Promise<void> => {
  try {
    const stringifiedDecks = await AsyncStorage.getItem("decks");
    const decks = JSON.parse(stringifiedDecks);
    delete decks[deckTitle];
    AsyncStorage.setItem("decks", decks);
    return decks;
  } catch (error) {
    return error;
  }
};

/**
 * It doesn't exactly deletes the card but set the deleted
 * property of a specific card to true
 */
export const deleteCardFromDeck = async (
  deckId: string,
  cardId: string
): Promise<Cards> => {
  try {
    const stringifiedDecks = await AsyncStorage.getItem("decks");
    const decks = JSON.parse(stringifiedDecks);
    decks[deckId].cards[cardId].deleted = true;
    await AsyncStorage.setItem("decks", decks);
    return decks[deckId].cards;
  } catch (error) {
    return error;
  }
};

export const addCardToDeck = async (
  deckId: string,
  card: Card
): Promise<Cards> => {
  try {
    const stringifiedDecks = await AsyncStorage.getItem("decks");
    let decks = JSON.parse(stringifiedDecks);
    decks[deckId].cards.push(card);
    AsyncStorage.setItem("decks", decks);
  } catch (error) {
    return error;
  }
};
