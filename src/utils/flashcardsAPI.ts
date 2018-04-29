import { AsyncStorage } from "react-native";
import { decks } from "./seeds";
import { Card, Decks, Deck, Cards } from "./types";
import { v4 } from "uuid";

/**
 * Helper function to avoid repeating code
 */
const getItem = async (key: string) => {
  const item = await AsyncStorage.getItem(key);
  return JSON.parse(item);
};

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

export const getDecks = async (): Promise<Deck[]> => {
  try {
    const decksObj: Decks = await getItem("decks");
    const decks = Object.values(decksObj);
    return decks.filter(deck => !deck.deleted);
  } catch (error) {
    return error;
  }
};

export const getDeck = async (deckId: string): Promise<Deck> => {
  try {
    const decks: Decks = await getItem("decks");
    return decks[deckId];
  } catch (error) {
    return error;
  }
};

export const addDeck = async (title: string): Promise<void> => {
  try {
    const id = v4();
    const decks = await getItem("decks");
    const deck: Deck = { id, title, deleted: false, cards: [] };
    decks[deck.id] = deck;
    await AsyncStorage.setItem("decks", JSON.stringify(decks));
  } catch (error) {
    return error;
  }
};

/**
 *  It doesn't exactly deletes the card but set the deleted
 * property of a specific card to true
 */
export const deleteDeck = async (deckId: string): Promise<void> => {
  try {
    const decks: Decks = await getItem("decks");
    decks[deckId].deleted = true;
    await AsyncStorage.setItem("decks", JSON.stringify(decks));
  } catch (error) {
    return error;
  }
};

export const getCardsByDeck = async (deckId: string): Promise<Card[]> => {
  try {
    const decks: Decks = await getItem("decks");
    return decks[deckId].cards.filter(card => !card.deleted);
  } catch (error) {
    return error;
  }
};

export const addCardToDeck = async (
  deckId: string,
  card: Card
): Promise<Cards> => {
  try {
    const decks: Decks = await getItem("decks");
    decks[deckId].cards.push(card);
    await AsyncStorage.setItem("decks", JSON.stringify(decks));
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
    const decks: Decks = await getItem("decks");
    decks[deckId].cards[cardId].deleted = true;
    await AsyncStorage.setItem("decks", JSON.stringify(decks));
    return decks[deckId].cards;
  } catch (error) {
    return error;
  }
};
