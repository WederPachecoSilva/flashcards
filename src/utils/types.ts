export interface Deck {
  id: string;
  title: string;
  deleted: boolean;
  cards: Card[];
}

export interface Decks {
  [propName: string]: Deck;
}

export interface Card {
  id: string;
  question: string;
  answer: string;
  deleted: boolean;
}

export type Cards = Card[];
