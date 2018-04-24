import { v4 } from "uuid";
import { Deck, Card } from "./types";

const BASE_URL = "http://localhost:3001";

export const getDecks = (): Promise<Deck[]> => {
  return fetch(BASE_URL + "/decks", {
    headers: {
      Authorization: "flashcards-app",
    },
    method: "get",
  }).then(res => res.json());
};

export const getDeck = (deckId: string): Promise<Deck> => {
  return fetch(BASE_URL + "/deck/" + deckId, {
    headers: {
      Authorization: "flashcards-app",
    },
    method: "get",
  }).then(res => res.json());
};

export const addDeck = (deck: Deck): Promise<Deck[]> => {
  return fetch(BASE_URL + "/deck", {
    headers: {
      Authorization: "flashcards-app",
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(deck),
  }).then(res => res.json());
};

export const deleteDeck = (deckId: string): Promise<Deck[]> => {
  return fetch(BASE_URL + "/deck/" + deckId, {
    headers: {
      Authorization: "flashcards-app",
      "Content-Type": "application/json",
    },
    method: "delete",
    body: JSON.stringify(deckId),
  }).then(res => res.json());
};

export const getCardsByDeck = (deckId: string): Promise<Card[]> => {
  return fetch(BASE_URL + "/cards/" + deckId, {
    headers: {
      Authorization: "flashcards-app",
    },
    method: "get",
  }).then(res => res.json());
};

export const addCards = (deckId: string, card: Card): Promise<Card[]> => {
  return fetch(BASE_URL + "/card/" + deckId, {
    headers: {
      Authorization: "flashcards-app",
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(card),
  }).then(res => res.json());
};

export const deleteCards = (
  deckId: string,
  cardId: string
): Promise<Card[]> => {
  return fetch(BASE_URL + "/card/" + deckId + "/" + cardId, {
    headers: {
      Authorization: "flashcards-app",
    },
    method: "delete",
  }).then(res => res.json());
};
