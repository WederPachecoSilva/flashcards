export interface Deck {
  id: string;
  title: string;
  deleted: boolean;
  cards: Card[];
}

export interface Decks {
  [propName: string]: Deck;
}

export type Level = "easy" | "intermediate" | "hard";

export interface Card {
  id: string;
  question: string;
  answer: string;
  level: Level;
  deleted: boolean;
}

export type Cards = Card[];
